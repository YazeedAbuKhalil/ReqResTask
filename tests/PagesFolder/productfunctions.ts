import { Page } from '@playwright/test';
import { CartPage } from './cartPage';
import { CheckoutPage } from './checkoutPage';
export async function emptythecart(page: Page) {
    const emptycart = new CheckoutPage(page);
    await emptycart.goto();
    await emptycart.clickDeleteButton();
    await emptycart.page.waitForLoadState();
    return emptycart;
}
export async function addproducttocart(page: Page, productIndex: number) {
    const add_to_cart = new CartPage(page, productIndex);
    await add_to_cart.goto();
    await add_to_cart.hoverProductContainer();
    await add_to_cart.clickAddToCartButton();
    await add_to_cart.page.waitForLoadState();
    return add_to_cart;
}
export async function checkoutpage(page: Page) {
    const checkout = new CheckoutPage(page);
    await checkout.goto();
    return checkout;
}