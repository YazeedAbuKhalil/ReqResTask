import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
    readonly url = "/checkout/cart/";
    readonly page: Page;
    readonly productName: Locator;
    readonly proceedToCheckoutButton: Locator;
    readonly removeItemButton: Locator;
    readonly cartEmptyMessage: Locator;
    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('tr.item-info strong.product-item-name a').nth(0);
        this.proceedToCheckoutButton = page.locator('li.item button[title="Proceed to Checkout"]');
        this.removeItemButton = page.locator('a[title="Remove item"].action-delete');
        this.cartEmptyMessage = page.locator('div.cart-empty p:first-child');
    }
    async goto() {
        await this.page.goto(this.url);
    }
    async clickDeleteButton() {
        await this.removeItemButton.click();
    }
}