import { expect } from "@playwright/test";

class HomePage {

    constructor(page) {
        this.page = page;
        //User Registation locators-
        this.firstName = page.locator("#firstName");
        this.lastName = page.locator("#lastName");
        this.email = page.locator("#userEmail");
        this.mobile = page.locator("#userMobile");
        this.Occupation = page.locator(".custom-select");
        this.gender = page.locator("[value=Male]");
        this.password = page.locator("#userPassword");
        this.confirmPassword = page.locator("#confirmPassword");
        this.confirmAge = page.locator("[type=checkbox]");
        this.register = page.locator('[type="submit"]');

        //User Login locators-
        this.userEmail =  page.locator("#userEmail");
        this.userPassword = page.locator("#userPassword");
        this.login = page.locator("#login");

        //Reset Password locators-
        this.EnterUserEmail = page.locator("[formcontrolname='userEmail']");
        this.NewPassword = page.locator("[formcontrolname='userPassword']");
        this.NewConfirmPassword = page.locator("[formcontrolname='confirmPassword']");
        this.ResetPassword = page.getByRole("button",{name: "Save New Password"});
    }

    async launchApplication(url) {
        await this.page.goto(url);
    }

    async userRegistrat() {
        await  this.page.locator("p.login-wrapper-footer-text").click();
        await expect(this.page.locator("h1.login-title")).toHaveText("Register");

        await this.firstName.fill("Yuvraj");
        await this.lastName.fill("Singh");
        await this.email.fill("singh12@gmail.com");
        await this.mobile.fill("1234567891");
        await this.Occupation.selectOption("Student");
        await this.gender.check();
        await this.password.fill("Yuv@1234");
        await this.confirmPassword.fill("Yuv@1234");
        await this.confirmAge.check();
        await this.register.click();

        // await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page.locator("h1.headcolor")).toHaveText("Account created succesfully");

    }

    async Userlogin() {

        await this.userEmail.fill("singh12@gmail.com")
        await this.userPassword.fill("Yuv@1111");
        await this.login.click();

        // await expect(this.page.locator("section h4#burgundy")).toHaveText("Filters");
    }

    async forgetPassword(){
        await this.page.getByRole("link",{name:"Forgot password?"}).click();
        await this.EnterUserEmail.fill("singh12@gmail.com");
        await this.NewPassword.fill("Yuv@1111");
        await this.NewConfirmPassword.fill("Yuv@1111");
        await this.ResetPassword.click();
    }
}
export { HomePage };
