import { Page, Locator } from '@playwright/test';

export class ProceedToCheckout {
    readonly url = "/checkout/#shipping";
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly companyField: Locator;
    readonly streetAddress1Field: Locator;
    readonly streetAddress2Field: Locator;
    readonly streetAddress3Field: Locator;
    readonly cityField: Locator;
    readonly stateProvinceField: Locator;
    readonly zipPostalCodeField: Locator;
    readonly countryField: Locator;
    readonly phoneNumberField: Locator;
    readonly shippingMethodsRadio: Locator;
    readonly nextButton: Locator;
    readonly newaddressbutton: Locator;
    readonly totalprice: Locator;
    readonly placeOrderButton: Locator;
    readonly thankyouPhrase: Locator;
    readonly orderNumber: Locator;
    readonly orderDetails: Locator;
    constructor(page: Page) {
        this.page = page;
        this.firstNameField = page.locator('input[name="firstname"]');
        this.lastNameField = page.locator('input[name="lastname"]');
        this.companyField = page.locator('input[name="company"]');
        this.streetAddress1Field = page.locator('input[name="street[0]"]');
        this.streetAddress2Field = page.locator('input[name="street[1]"]');
        this.streetAddress3Field = page.locator('input[name="street[2]"]');
        this.cityField = page.locator('input[name="city"]');
        this.stateProvinceField = page.locator('input[name="region"]');
        this.zipPostalCodeField = page.locator('input[name="postcode"]');
        this.countryField = page.locator('select[name="country_id"]');
        this.phoneNumberField = page.locator('input[name="telephone"]');
        this.shippingMethodsRadio = page.locator('//input[@type="radio"]').nth(0);
        this.nextButton = page.locator('//span[text()="Next"]/parent::button');
        this.newaddressbutton = page.locator('#checkout-step-shipping div.new-address-popup button');
        this.totalprice = page.locator('tr.grand td[data-th="Order Total"] span.price');
        this.placeOrderButton = page.locator('button[title="Place Order"]');
        this.thankyouPhrase = page.locator('span[data-ui-id="page-title-wrapper"]');
        this.orderNumber = page.locator('div.checkout-success p a').nth(0);
        this.orderDetails = page.locator('div.checkout-success p').nth(0);

    }
    async goto() {
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    }
    async fillFirstNameField() {
        await this.firstNameField.fill('Yazeed');
    }
    async fillLastNameField() {
        await this.lastNameField.fill('Ashraf');
    }
    async fillCompanyField() {
        await this.companyField.fill('Optimum');
    }
    async fillStreetAddress() {
        await this.streetAddress1Field.fill('Amman');
        await this.streetAddress2Field.fill('TlaAli');
        await this.streetAddress3Field.fill('Almadina street');
    }
    async fillCityField() {
        await this.cityField.fill('Amman');
    }
    async fillStateProvinceField() {
        await this.stateProvinceField.fill('Amman');
    }
    async fillZipPostalCode() {
        await this.zipPostalCodeField.fill('123456');
    }
    async selectCountryField() {
        await this.countryField.selectOption('Jordan');
    }
    async fillPhoneNumberField() {
        await this.phoneNumberField.fill('0797000000');
    }
    async chooseShippingMethods() {
        await this.shippingMethodsRadio.click();
    }
    async clickNextButton() {
        await this.nextButton.click();
    }
    async clickPlaceOrderButton() {
        await this.placeOrderButton.click();
    }
}