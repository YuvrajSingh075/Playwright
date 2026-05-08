import { chromium, expect } from "@playwright/test";
import { isContext } from "node:vm";

class diff_UI_Page {

    constructor(page) {
        this.page = page;
        //Search on wikipedia-
        this.searchInput = page.locator("#Wikipedia1_wikipedia-search-input");
        this.search = page.locator("input[type=submit]");
        this.searchResult = page.locator("#wikipedia-search-result-link");

        //Dynamic button-
        // this.dynamicBtn = page.getByRole('button',{name: 'START'});
        this.dynamicBtn1 = page.locator('button').filter({ hasText: /START|STOP/ });

        //Alert PopUp-
        this.simpleAlert = page.locator("[onclick^=myFunctionAlert]");
        this.confirmationAlert = page.locator("[onclick^=myFunctionConfirm]");
        this.promptAlert = page.locator("[onclick^=myFunctionPrompt]");
        this.alertMsg = page.locator("#demo");
        this.NewTab = page.getByRole("button", { name: 'New Tab' });
        this.popularWindow = page.getByRole("button", { name: 'Popup Windows' });

        //Mouse Hower event locator-
        this.mouseHower = page.locator("button.dropbtn");
        this.hoverItem1 = page.getByRole("link", { name: 'Mobiles' });
        this.hoverItem2 = page.getByRole("link", { name: 'Laptops' });

        //Double click event locator-
        this.field1 = page.locator("#field1");
        this.field2 = page.locator("#field2");
        this.copy = page.getByRole("button", { name: 'Copy Text' });

        //Drag and drop locators-
        this.drag = page.locator("div#draggable");
        this.drop = page.locator("div#droppable");

        //Slider locators-
        this.priceRange = page.locator("input#amount");

        
        //Scrolling Dropdowns locators--
        this.SelectItems = page.locator("input#comboBox");

    }

    async launchApplication(url) {
        await this.page.goto(url);
    }

    async dynamicButton() {
        // for Serching on wikipideia-
        await this.searchInput.fill("www.google.com");
        await this.search.click();
        await this.searchResult.click();

        //wait for button to be visible or for START-
        await this.dynamicBtn1.waitFor({ state: 'visible' });
        await expect(this.dynamicBtn1).toHaveText('START');
        await this.dynamicBtn1.click();

        //Verify text changed to STOP
        await expect(this.dynamicBtn1).toHaveText('STOP');
        await this.dynamicBtn1.click();

        //Verify it toggled back to SRART
        await expect(this.dynamicBtn1).toHaveText('START');

    }

    async alertOrPopUp() {
        // Simple Alert(Accept alert)- with ok btn-
        this.page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain('I am an alert box!');
            await dialog.accept();
        })
        await this.simpleAlert.click();
    }

    async confirmationAlert() {
        //confirmation alert(dialog dismiss)-
        this.page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('confirm');
            expect(dialog.message()).toContain('Press a button!');
            await dialog.accept(); //choose by using OK Button
            // await dialog.dismiss(); //choose By using cancel button
        })
        await this.confirmationAlert.click();
        expect(this.alertMsg).toHaveText('You pressed OK!');
    }

    async prompt_Alert() {
        //promptAlert alert(Get Alert Text)-
        this.page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('prompt');
            expect(dialog.message()).toContain('Please enter your name:');
            expect(dialog.defaultValue()).toContain('Harry Potter')
            await dialog.accept('john');
        })
        await this.promptAlert.click();
        expect(this.alertMsg).toHaveText('Hello john! How are you today?');
    }

    async PopUPwindow() {
        // const pagePromise = this.isContext.waitForEvent('page');
        // await this.NewTab.click();
        // const newPage = await pagePromise;
        // console.log(await newPage.title());

        context.on('page', async page => {
            await this.page.waitForLoadState();
            console.log(await page.title());
        });
        await this.NewTab.click();



        const popupPromise = this.page.waitForEvent("popup");
        await this.popularWindow.click();
        const popup = await popupPromise;
        console.log(await popup.title());

    }

    async MouseEvent() {
        // await this.mouseHower.hover();
        // await this.hoverItem1.hover();
        // await this.hoverItem2.waitFor({ state: 'visible' });
        // await this.hoverItem2.hover();


        await this.copy.dblclick();
        // await this.copy.fill("QA Academy");
        await this.field2.waitFor({ state: 'visible' });
        await expect(this.field2).toHaveText("Hello World!");

        //Drag And Drop event-
        await this.drag.hover();
        await this.page.mouse.down(); // drag the element on the page anaywhere;

        await this.drop.hover();
        await this.page.mouse.up(); // drop the element on the target element;

        // Approch 2 -
        await this.drag.dragTo(this.drop);

    }

    async ScrollingDropdown(){
        
        //Scroll DropDown Selection-
        await this.SelectItems.scrollIntoViewIfNeeded();
        await this.SelectItems.click();

        //Get all items-
        const options = this.page.locator("div.option");
        const count = await options.count();
        console.log('Total items:',count);

        //Loop for select specific item--
        for(let i = 0; i < count; i++){
            const itemText = options.nth(i).textContent();

            if(itemText == "Item 7"){
                await options.nth(i).click();
                break;
            }
        }
        
        await this.SelectItems.waitFor({ state: 'visible' });
        await expect(this.SelectItems).toContainText("Item 7");
    }
}

export { diff_UI_Page };