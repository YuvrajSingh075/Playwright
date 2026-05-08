class Playwright_practice{

    constructor(page){
        this.page = page;
        // GetByRole locators-
        this.Pributton = page.getByRole('button',{name: 'Toggle Button'});
        this.Tglbutton = page.getByRole('button',{name:'Primary Action'});
        this.divbutton = page.getByRole('button',{name: 'Div with button role'});
        this.textbox = page.locator("#username")
        // this.checkbox = page.getByRole('',{role:'checkbox'});
        // this.navigation = this.getByRole(role="navigation");
        this.listitem1 = page.getByRole('link',{name: 'Home'});
        this.listitem2 = page.getByRole('link',{name: 'Products'});
        this.listitem3 = page.getByRole('link',{name: 'Contact'});
        this.alert = page.getByRole("alert");
    }

    async launchApplication(url){
        await this.page.goto(url);
    }

    async getByRole(){
        await this.Pributton.hover();
        await this.Tglbutton.click();
        await this.divbutton.click();
        await this.textbox.fill("Demo123");
        // await this.checkbox.check();
        await this.listitem1.click();
        await this.listitem2.click();
        await this.listitem3.click();
        await this.expect(this.alert).toBeVisible();
    }
}
export {Playwright_practice};