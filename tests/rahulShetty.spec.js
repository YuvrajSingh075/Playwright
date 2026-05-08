import {test, expect} from "@playwright/test";
import { HomePage } from "../rahulshetty_pages/HomePage";
import { OrderPage } from "../rahulshetty_pages/OrderPage";

test("User Registration", async({page})=>{
    const homePage = new HomePage(page);
    await homePage.launchApplication("https://rahulshettyacademy.com/client/#/auth/login");
    // await homePage.userRegistrat();
    // await homePage.Userlogin();
    await homePage.forgetPassword();
}) 

test("Order Product", async({page})=>{
    const homePage = new HomePage(page);
    const orderPage = new OrderPage(page);
    await homePage.launchApplication("https://rahulshettyacademy.com/client/#/auth/login");
    await homePage.Userlogin();
    await page.waitForLoadState("networkidle");
    await orderPage.addToCart();
    await page.waitForLoadState("networkidle");
    await orderPage.check_Out();
    await page.waitForLoadState("networkidle");
    await orderPage.place_Order();

})