import { Page, Locator } from '@playwright/test';
export class SignInPage {

    readonly url = "/customer/account/login";
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly signinButton: Locator;
    readonly welcomingPhrase: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.locator("input#email");
        this.passwordField = page.locator('input[name="login[password]"]');
        this.signinButton = page.locator('fieldset.fieldset button[id="send2"]');
        this.welcomingPhrase = page.locator('div.header li.greet span.logged-in');
    }
    async goto() {
        await this.page.goto(this.url, { waitUntil: 'load' });
    }
    async fillEmailField(email: string) {
        await this.emailField.fill(email);
    }
    async fillPasswordField(password: string) {
        await this.passwordField.fill(password);
    }
    async clickOnSignin() {
        await this.signinButton.click();
    }
}