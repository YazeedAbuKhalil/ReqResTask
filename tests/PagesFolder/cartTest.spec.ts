import { expect } from '@playwright/test';
import { test as Login } from './loginfixture';
import { addproducttocart, emptythecart, checkoutpage } from './productfunctions';
Login.use({
    email: process.env.FIRSTEMAIL!,
    password: process.env.PASSWORD!,
})
Login.describe.serial('The process of adding product to the cart, and empty the cart', () => {

    Login('Adds product to cart successfully', async ({ loggedInPage }) => {

        const addtocart = await addproducttocart(loggedInPage, 3);

        await addtocart.alertMessage.waitFor();

        await expect(addtocart.alertMessage).toHaveText("You added Endeavor Daytrip Backpack to your shopping cart.",)
    });

    Login("Product added in checkout", async ({ loggedInPage }) => {

        const checkout = await checkoutpage(loggedInPage);

        await expect(checkout.productName).toHaveText("Endeavor Daytrip Backpack");
    });

    Login("Empty the cart", async ({ loggedInPage }) => {

        const emptycart = await emptythecart(loggedInPage);

        await emptycart.cartEmptyMessage.waitFor();

        await expect(emptycart.cartEmptyMessage).toHaveText("You have no items in your shopping cart.");
    });
});