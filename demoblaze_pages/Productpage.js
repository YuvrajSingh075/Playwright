import { expect } from "@playwright/test";

class Productpage {

    constructor(page) {
        this.page = page;
        // Select Products locators-
        this.cardTitle = page.locator(".card-title a");
        this.nextBtn = page.locator("button#next2");
        this.productPrice = page.locator('h3.price-container');
        this.addCart = page.locator('[onclick^=addToCart]');
        this.cartInProduct = page.locator(".col-lg-8 h2");

        // Add to cart products locators-
        this.GotoCard = page.locator("#cartur");
        this.orderPlace = page.getByRole("button", { name: 'Place Order' });

        // Place order locators-
        this.name = page.locator("#name.form-control");
        this.country = page.locator("#country");
        this.city = page.locator("#city");
        this.cartNo = page.locator("#card");
        this.month = page.locator("#month");
        this.year = page.locator("#year");
        this.purchase = page.locator("onclick^=purchaseOrder");

    }

    async selectproduct(productName) {
        await this.page.waitForLoadState('domcontentloaded');

        let productFound = false;

        while (!productFound) {

            await this.cardTitle.first().waitFor({ state: 'visible' });

            let products = await this.cardTitle.allTextContents();

            for (let i = 0; i < products.length; i++) {

                if (products[i].trim() === productName) {
                    await this.cardTitle.nth(i).click();
                    productFound = true;
                    break;
                }


            }

            if (!productFound) {
                if (await this.nextBtn.isVisible()) {
                    await this.nextBtn.click();
                    await this.page.waitForTimeout(2000);
                } else {
                    break;
                }

                // await this.page.waitForLoadState('domcontentloaded');
            }
        }
    }

    async addTocart() {
        await this.page.waitForLoadState('load');
        await this.addCart.click();
        this.page.on("dialog", async dialog => {
            expect(dialog.type()).toContain("alert");
            expect(dialog.message()).toContain("Product added.");
            await dialog.accept();
        })
    }

    async PlaceOrder() {
        await this.GotoCard.click();
        await expect(this.cartInProduct).toHaveText("Products");
        const confirmPrice = this.page.locator("#totalp");
        if (this.productPrice == confirmPrice) {
            await this.orderPlace.click();

            await this.name.fill("Yuvraj");
            await this.country.fill("India");
            await this.city.fill("Moradabad");
            await this.cartNo.fill("123476891243");
            await this.month.fill("March");
            await this.year.fill("2026");

            await expect(this.page.locator('.sweet-alert h2')).toContainText('Thank you for your purchase!');
            let order_details = await this.page.locator('.sweet-alert p').textContent();
            console.log(order_details);

            await this.purchase.click();
        }

    }
}

export { Productpage }