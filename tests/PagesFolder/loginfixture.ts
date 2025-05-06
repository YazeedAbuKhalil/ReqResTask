import { test as base, Page } from '@playwright/test';
import { SignInPage } from './signinPage';
type LoginFixture = {
    loggedInPage: Page;
};

export const test = base.extend<LoginFixture, { email: string; password: string }>({
    email: ['', { option: true, scope: 'worker' }],
    password: ['', { option: true, scope: 'worker' }],
    loggedInPage: async ({ page, email, password }, use) => {
        const signin = new SignInPage(page);
        await signin.goto();
        await signin.fillEmailField(email);
        await signin.fillPasswordField(password);
        await signin.clickOnSignin();
        await use(page);
    },
});