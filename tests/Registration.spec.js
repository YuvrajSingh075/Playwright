import {test, expect} from "@playwright/test";

test("User Registration", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/register");
    await page.locator("#firstName").fill("Yuvraj");
    await page.locator("#lastName").fill("Singh");
    await page.locator("#userEmail").fill("singhyuvraj0374@gmail.com");
    await page.locator("#userMobile").fill("7505690374");
    await page.locator(".custom-select").selectOption("Student");
    await page.locator("[value=Male]").check()
    await page.locator("#userPassword").fill("yuvraj@12");
    await page.locator("#confirmPassword").fill("yuvraj@12");
    await page.locator("[type=checkbox]").check();

    await page.locator("#login").click();
    await expect(page).toHaveTitle("Account created succesfully"); 
});

test("User Login", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await page.locator("#userEmail").fill("singhyuvraj0374@gmail.com");
    await page.fill("#userPassword","singh@12");
    await page.locator("[value=Login]").click();

    await expect(page.locator("section h4#burgundy")).toHaveText("Filters");

});

test("Reset passsword", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/password-new")
    await page.locator("[formcontrolname=userEmail]").fill("singhyuvraj0374@gmail.com");
    await page.fill("#userPassword", "singh@12")
    await page.fill("#confirmPassword", "singh@12")
    await page.locator("[type=submit]").click();

    await expect(page).toHaveTitle("Let's Shop");
});

test("Order Product", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

    // const product = page.locator("div.card-body:").
    await page.locator((".w-10").last()).click();

    await expect.page.locator('div[role="alert"]').toHaveText("Product Added to cart");

    await page.locator("[routerlink=/dashboard/cart]").click();

    await expect(page.locator("h3:has-text(iphone 13 pro)")).toHaveText("iphone 13 pro");
    
    await page.locator(".btn-primary:nth(2)").click();

})

test.only('order product', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('input[formcontrolname="userEmail"]').fill("puja123@gmail.com");
    await page.locator('input[formcontrolname="userPassword"]').fill("Puja@7722");
    await page.locator('#login').click();
    const productname = 'iphone 13 pro'
    let price = '';
    const product_tile = page.locator('div.card-body')
    await product_tile.first().waitFor({state:'attached'});
    for(let i = 0; i< await product_tile.count(); i++){
        if(await product_tile.nth(i).locator('b').textContent()==productname){
            price= await product_tile.nth(i).locator('.text-muted').textContent();
            await product_tile.nth(i).locator('button:has-text(" Add To Cart")').click();
            break;
        }
    }
    //checkout 
    console.log(price)
})