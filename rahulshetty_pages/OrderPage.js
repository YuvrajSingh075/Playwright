import { expect } from "@playwright/test";
class OrderPage {

    constructor(page) {
        this.page = page;
        this.product = page.locator("div.card-body");
        this.productName = "iphone 13 pro";
        this.price = "";
        this.GoToCart = page.locator("[routerlink='/dashboard/cart']");
        this.checkOut = page.locator("button",{name: 'Checkout'});    
        
        this.CardNum = page.locator("[value='4542 9931 9292 2293']");
        this.validUptoMonth = page.locator(".dll:nth(1)");
        this.validUptoDate = page.locator(".dll:nth(2)");
        this.CVV = page.locator(".txt:nth(2)");
        this.NameOnCard = page.locator(".txt:nth(3)");
        this.coupon = page.locator("[name='coupon']");
        this.Applycoupon = page.locator("[type='submit']");
        this.email = page.locator(".txt:nth(5)");
        this.country = page.getByRole('button',{name: "Select Country"});
        this.placeOrder = page.locator("div.actions");

        
    }

    async addToCart() {
        for (let i = 0; i < await this.product.count(); i++) {
            const name = await this.product.nth(i).locator("b").textContent();
            if (name === this.productName) {
                this.price = await this.product.nth(i).locator(".text-muted").textContent();
                this.price.replaceAll(" ", "");
                console.log(this.price);
                await this.product.nth(i).locator('button:has-text(" Add To Cart")').click();
                break;
            }   
        }
    }

    async check_Out(){
        await this.GoToCart.click();
        expect(this.page.locator(".heading h1")).toHaveText("My Cart");
        const confproName = await this.page.locator(".cartSection h3").textContent();
        const confProPrice = await this.page.locator(" li:nth-child(2) > span.value").textContent();

        if(confproName == this.productName && confProPrice == this.price){
            await this.checkOut.click();
        }
    }

    async place_Order(){
        // expect(this.page.locator("div.item__title")).toHaveText("iphone 13 pro");
        // await this.CardNum.fill("123412341234");
        // await this.validUptoMonth.selectOption({label : '07'});
        // await this.validUptoDate.selectOption("25");
        // await this.CVV.fill("343");
        // await this.NameOnCard.fill("Yuvraj");
        // await this.coupon.fill("Dis50");
        // await this.Applycoupon.click();
        // await this.email.fill("singh12@gmail.com");

        await this.country.pressSequentially("ind");
        const selectcountry = this.page.locator("button.ta-item");
        for(let i = 0; i < await selectcountry.count(); i++){
            if(selectcountry(i) == "india"){
                await selectcountry.click();
                break;
            }
        }
        await this.placeOrder.click();
    }
}
export {OrderPage};