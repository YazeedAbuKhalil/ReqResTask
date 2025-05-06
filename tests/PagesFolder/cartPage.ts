import { Page, Locator } from "@playwright/test";

export class CartPage {
    readonly url = "/gear/bags.html";
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly productName: Locator;
    readonly alertMessage: Locator;
    readonly productcontainer: Locator;
    readonly productIndex: number;
    constructor(page: Page, productIndex: number) {
        this.page = page;

        this.productIndex = productIndex;
        this.addToCartButton = page.locator('ol.product-items li button[title="Add to Cart"]').nth(this.productIndex);
        this.productcontainer = page.locator('ol.product-items li').nth(this.productIndex);
        this.productName = page.locator('ol.product-items li a.product-item-link');
        this.alertMessage = page.locator('div.message-success div');
    }
    async goto() {
        await this.page.goto(this.url);
    }
    async hoverProductContainer() {
        await this.productcontainer.hover();
    }
    async clickAddToCartButton() {
        await this.addToCartButton.click();
    }
}