import { Page, expect } from '@playwright/test';
import { ProceedToCheckout } from './proceedToCheckoutPage';
import { OrderHistoryPage } from './orderhistoryPage';
import { test as Login } from './loginfixture';
import { addproducttocart } from './productfunctions';

async function fillshippinginfo(page: Page) {

    const checkout_process = new ProceedToCheckout(page);

    await checkout_process.goto();

    await checkout_process.page.waitForLoadState();

    const saved_shipping_address = await checkout_process.newaddressbutton.isVisible();

    if (saved_shipping_address) {
        await checkout_process.chooseShippingMethods();

        await checkout_process.clickNextButton();

        await checkout_process.page.waitForLoadState();
    }
    else {
        await checkout_process.fillFirstNameField();
        await checkout_process.fillLastNameField();
        await checkout_process.fillCompanyField();
        await checkout_process.fillStreetAddress();
        await checkout_process.selectCountryField();
        await checkout_process.fillCityField();
        await checkout_process.fillStateProvinceField();
        await checkout_process.fillZipPostalCode();
        await checkout_process.fillPhoneNumberField();

        await checkout_process.chooseShippingMethods();

        await checkout_process.clickNextButton();

        await checkout_process.page.waitForLoadState();
    }
    return checkout_process;
}
async function finishcheckout(page: Page) {

    const finish_checkout_process = new ProceedToCheckout(page);

    await finish_checkout_process.clickPlaceOrderButton();

    await finish_checkout_process.page.locator('span[data-ui-id="page-title-wrapper"]', { hasText: 'Thank you for your purchase!' }).waitFor();

    await finish_checkout_process.page.waitForSelector('div.checkout-success p');

    return finish_checkout_process;

}
Login.use({
    email: process.env.SECONDEMAIL!,
    password: process.env.PASSWORD!,
})
Login.describe.serial('Finish checkout, place order, and order is visible in orders history page', () => {

    let ordernum;

    let totalprice;

    Login('checkout process', async ({ loggedInPage }) => {

        const addtocart = await addproducttocart(loggedInPage, 3);

        const filling_shipping_info = await fillshippinginfo(loggedInPage);

        loggedInPage.waitForSelector('tr.grand td[data-th="Order Total"] span.price');

        totalprice = await filling_shipping_info.totalprice.textContent();

        const finish_checkout_process = await finishcheckout(loggedInPage);

        const thankful_phrase = await finish_checkout_process.thankyouPhrase.textContent();

        ordernum = await finish_checkout_process.orderNumber.textContent();

        expect(thankful_phrase).toContain("Thank you for your purchase!");

        expect(await finish_checkout_process.orderDetails.textContent()).toContain(`Your order number is: ${ordernum}.`);
    });
    Login("order history check", async ({ loggedInPage }) => {

        const history = new OrderHistoryPage(loggedInPage);

        await history.goto();

        expect(await history.orderNumber.textContent()).toBe(ordernum);

        expect(await history.orderTotal.textContent()).toBe(totalprice);
    });
})