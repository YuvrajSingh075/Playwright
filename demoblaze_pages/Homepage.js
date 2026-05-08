class Homepage{

    constructor(page){
        this.page = page;
        // User SignUp locators-
        this.signUp = page.locator("#signin2");
        this.username = page.locator("#sign-username");
        this.password = page.locator("#sign-password");
        this.signUpBtn = page.locator("[onclick^=register]");

        //User Login locators-
        this.login = page.locator("#login2");
        this.loginUsername = page.locator("#loginusername");
        this.loginPassword = page.locator("#loginpassword")
        this.loginBtn = page.locator("[onclick^=logIn]")
    }

    async launchApplication(url){
        await this.page.goto(url);
    }

    async userSignup(){
        await this.signUp.click();
        await this.username.fill("Demoo");
        await this.password.fill("Demoo@1234");
        await this.signUpBtn.click();
    }

    async userLogin(){
        await this.login.click();
        await this.loginUsername.fill("Demoo");
        await this.loginPassword.fill("Demoo@1234");
        await this.loginBtn.click();
    }
}
export{Homepage}