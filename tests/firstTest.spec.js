const{test, expect} = require("@playwright/test");

test("Launch Browser", async({page})=>{
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");
    await expect(page).toHaveTitle("ParaBank | Welcome | Online Banking");
});

test("CSS/XPath selector", async({page})=>{
    await page.goto("https://login.salesforce.com/");
    await page.locator("//*[@id='username']").fill("RCV");
    await page.locator("#password").fill("@123");
    await expect(page).toHaveTitle("Login | Salesforce");
})