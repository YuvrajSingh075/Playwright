const {test, expect} = require("@playwright/test");

test("getByRole", async({page}) => {
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");
    await page.getByRole("link", {name: "Forgot login info?"}).click();
});

test("getByRole1", async({page}) => {
    await page.goto("https://login.salesforce.com/");
    await page.getByRole("textbox", {name: "Remember me"}).click();
});

test("getByLabel", async({page}) => {
    await page.goto("https://login.salesforce.com/");
    await page.getByLabel("Remember me").click();
});

test("getByText", async({page}) => {
    await page.goto("https://login.salesforce.com/");
    await page.getByText('Use Custom Domain').click();
});

test("getByText1", async({page}) => {
    await page.goto("https://login.salesforce.com/");
    await page.getByText('Use Custom Domain').click();
});


