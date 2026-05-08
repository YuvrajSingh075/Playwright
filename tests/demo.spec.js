import {test, expect} from "@playwright/test";

test("Demo test", async({browser}) => {

    let context = await browser.newContext();
    let page = await browser.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("rahulshettyacademy");

    await page.fill("#password","Learning@830$3mK2");
    await page.locator('//select').selectOption("teach");

    await page.locator('#terms').check();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    await expect(page.locator('#terms')).not.toBeChecked();

    await page.locator('#signInBtn').click();
    await expect(page).toHaveTitle("ProtoCommerce");
})
