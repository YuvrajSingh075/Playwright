class ShadowdomPage{

    constructor(page){
        this.page = page;
        this.section1 = page.locator("#input1");
        this.submit1 = page.locator("#btn1");
        this.section2 = page.locator("#input2");
        this.submit2 = page.locator("#btn2");
        this.section3 = page.locator("#input3");
        this.submit3 = page.locator("#btn3");

        this.Home = page.getByRole("link",{name: 'Home'});
        this.HiddenElement = page.getByRole("link",{name: 'Hidden Elements & AJAX'});
        this.Downloadfile = page.getByRole("link",{name: 'Download Files'});

        this.blogs = page.getByRole("link",{name: 'Blog'});
        this.

    }

    async launchApplication(url){
        await this.page.goto(url);
    }

    async Form(){
        await this.section1.fill("This is paragraph for section one");
        await this.submit1.click();
        await this.section2.fill("This is paragraph for section two");
        await this.section2.click();
        await this.section3.fill("This is paragraph for section three");
        await this.section3.click();

        await this.Home.click();
        
    }

    async shadowDom(){

    }
}