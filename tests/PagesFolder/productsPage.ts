import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly url = "/catalogsearch/result/?q=backpack";
    readonly page: Page;
    readonly itemName: Locator;
    readonly productName: Locator;
    readonly productContainer: Locator;
    constructor(page: Page) {
        this.page = page;
        this.itemName = page.locator("ol.items li a.product-item-link");
        this.productName = page.locator('[data-ui-id="page-title-wrapper"]');
        this.productContainer = page.locator('div.product-item-details a.product-item-link').nth(0);
    }
    async goto() {
        await this.page.goto(this.url);
    }
    async clickOnProduct() {
        await this.productContainer.click();
    }

}