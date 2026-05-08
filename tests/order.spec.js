import {test, expect} from '@playwright/test';

test("verify product order", async({page}) => {
    const username = "singhyuvraj0374@gmail.com";
    const passsword = "singh@12";
    const productName = "iphone 13 pro";
    const price = "";

    // Login into website--
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill(username);
    await page.locator("#userPassword").fill(passsword);
    await page.locator("#login").click();

    // Product Add to cart--
    const product = page.locator("div.card-body");
    
    for(let i = 0; i < await product.count(); i++ ){
        const name = await product.nth(i).locator("b").textContent();
        if( name === productName){
            price = await product.nth(i).locator(".text-muted").textContent();
            price.replaceAll(" ","");
            await product.nth(i).locator('button:has-text(" Add To Cart")').click();
            break;
        }
    }

    // await page.locator("[routerlink='/dashboard/cart']").click();
    await page.locator("[routerlink$='cart']").click();
    await expect(page.locator("h3:has-text('iphone 13 pro')")).toBeVisible();

    // Order palce detils and confirmation--
    await page.locator(" li:nth-child(2) > span.value").textContent().toEqual(price);
    await page.locator("button:has-text('Checkout')").click();

    await page.locator("[placeholder='Select Country']").pressSequentially("Ind");
    const country = page.locator("button.ta-item");
    for(let i = 0; i < await country.count(); i++){
        let countryName = await country.nth(i).textContent();
        if(countryName == "India"){
            await country.nth(i).click();
            break;
        }
    }
    await page.click(".action__submit ");
    await expect(page.locator("h1:has-text('Thankyou for the order.')")).toBeVisible();

    // Cheack the order from orders history--
    let orderID =page.locator("label.ng-star-inserted");
    await page.click("[routerlink='/dashboard/myorders']");

    let orderdetils = page.locator("tr.ng-star-inserted");
    for(let i = 0; i < orderdetils.count(); i++ ){
        
    }

});
