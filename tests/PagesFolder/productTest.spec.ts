import { expect } from '@playwright/test';
import { HomePage } from './homePage';
import { ProductsPage } from './productsPage';
import { test as Login } from './loginfixture';

Login.use({
    email: process.env.FIRSTEMAIL!,
    password: process.env.PASSWORD!,
})
Login.describe('Product Search Functionality', () => {


    Login('Search on specific product', async ({ loggedInPage }) => {

        const search = new HomePage(loggedInPage);

        await search.productSearch();

        await expect(loggedInPage).toHaveURL('/catalogsearch/result/?q=backpack');
    });

    Login('All search result should contain the search term', async ({ loggedInPage }) => {

        const products = new ProductsPage(loggedInPage);

        await products.goto();

        const count = await products.itemName.count();

        for (let i = 1; i <= count; i++) {
            expect.soft(await products.itemName.nth(i).textContent()).toContain("Backpack");
        }
    });

    Login('The correct product page is opened', async ({ loggedInPage }) => {

        const productpage = new ProductsPage(loggedInPage);

        await productpage.goto();

        await productpage.clickOnProduct();

        expect(await productpage.productName.textContent()).toBe("Driven Backpack");
    });
});