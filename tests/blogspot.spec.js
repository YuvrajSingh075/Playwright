import {test, expect} from '@playwright/test';
import { HomePage } from "../blogspot_pages/HomePage";
import {Playwright_practice} from "../blogspot_pages/Playwright_practice";
import { diff_UI_Page } from '../blogspot_pages/diff_UI_Page';

test("Form Submit", async({page})=>{
    const homePage = new HomePage(page);
    await homePage.launchApplication("https://testautomationpractice.blogspot.com/");
    // await homePage.submitForm();
    await homePage.uploadFiles();
})

test("Playwright Practice", async({page})=>{
    const practicePage = new Playwright_practice(page);
    await practicePage.launchApplication("https://testautomationpractice.blogspot.com/p/playwrightpractice.html#");
    await practicePage.getByRole();
})

test("Diff UI elements", async({page})=>{
    const diffUIpage = new diff_UI_Page(page);
    await diffUIpage.launchApplication("https://testautomationpractice.blogspot.com/");
    // await diffUIpage.dynamicButton();
    // await diffUIpage.alertOrPopUp();
    // await diffUIpage.prompt_Alert();
    // await diffUIpage.MouseEvent();
    // await diffUIpage.PopUPwindow();
    await diffUIpage.ScrollingDropdown();
    
    
})

