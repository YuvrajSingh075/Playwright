import {test,expect} from '@playwright/test';
import { Homepage } from '../demoblaze_pages/Homepage';
import { Productpage } from '../demoblaze_pages/Productpage';

test("User Registration", async({page})=>{
    const homePage = new Homepage(page);
    await homePage.launchApplication("https://www.demoblaze.com/");
    // await homePage. userSignup();
    await homePage.userLogin();
})

test("order product", async({page})=>{
    const homePage = new Homepage(page);
    const productpage = new Productpage(page);
    await homePage.launchApplication("https://www.demoblaze.com/");
    await homePage.userLogin();
    await productpage.selectproduct("MacBook Pro"); 
    await productpage.addTocart();
    await productpage.PlaceOrder();
})