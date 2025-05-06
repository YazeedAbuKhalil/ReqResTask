import { test, expect } from '@playwright/test';
import { HomePage } from './homePage';
import { SignInPage } from './signinPage';
const email = process.env.FIRSTEMAIL!;
const password = process.env.PASSWORD!;
const userName = process.env.USERNAME;
test("Home Page and products are visibile", async ({ page }) => {

    const homepage = new HomePage(page);

    await homepage.goto();

    expect(homepage.page).toBeTruthy();

    await expect(homepage.product_Container).toBeVisible();
});
test("Welcoming message is visibile", async ({ page }) => {

    const signin = new SignInPage(page);

    await signin.goto();

    await signin.fillEmailField(email);

    await signin.fillPasswordField(password);

    await signin.clickOnSignin();

    await signin.welcomingPhrase.waitFor();

    await expect(signin.welcomingPhrase).toHaveText(`Welcome, ${userName}!`);
});


