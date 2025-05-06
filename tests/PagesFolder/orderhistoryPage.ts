import { Page, Locator } from '@playwright/test';

export class OrderHistoryPage {
    readonly URL = "/sales/order/history/";
    readonly page: Page;
    readonly orderNumber: Locator;
    readonly orderTotal: Locator;
    constructor(page: Page) {
        this.page = page;
        this.orderNumber = page.locator('td[data-th="Order #"]').nth(0);
        this.orderTotal = page.locator('td[data-th="Order Total"] span.price').nth(0);
    }
    async goto() {
        await this.page.goto(this.URL);
    }
}