import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly URL = '/';
    readonly page: Page;
    readonly product_Container: Locator;
    readonly searchBar: Locator;
    constructor(page: Page) {
        this.page = page;
        this.product_Container = page.locator("ol.product-items");
        this.searchBar = page.locator('#search');
    }
    async goto() {
        await this.page.goto(this.URL, { waitUntil: 'domcontentloaded' });
    }
    async productSearch() {
        await this.searchBar.fill("backpack");
        await this.searchBar.press("Enter");
    }
}