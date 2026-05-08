class HomePage{

    constructor(page){
        this.page = page;
        //Form locators-
        this.name = page.getByPlaceholder('Enter Name');
        this.email = page.locator('#email');
        this.phoneNo = page.locator('#phone');
        this.addres = page.locator('#textarea');
        this.gender = page.locator("[for=male]")
        this.days = page.locator('#sunday');
        this.country = page.locator('#country');
        this.colors = page.locator('#colors');
        this.animals = page.locator('#animals');
        this.date1 = page.locator('input#datepicker');
        this.date2 = page.locator('input#txtDate');
        this.startDate = page.locator('#start-date');
        this.endDate = page.locator('#end-date');
        this.submit = page.locator("button.submit-btn")

        //Uploads Files locators-
        this.SingleFile = page.locator("#singleFileInput");
        this.uploadSingle = page.getByRole("button",{name: 'Upload Single File'})
        this.MultipleFile = page.locator("#multipleFilesInput");
        this.uploadMul = page.getByRole("button",{name: 'Upload Multiple Files'});

    }

    async launchApplication(url){
        await this.page.goto(url);
    }

    async submitForm(){
        await this.name.fill("Demo");
        await this.email.fill("demo@gmail.com");
        await this.phoneNo.fill("7654654634");
        await this.addres.fill("noida, uttarpradesh");
        await this.gender.check();
        await this.days.check();
        await this.country.selectOption({label:'India'});
        // await this.country.selectOption("Japan");
        // await this.country.selectOption({value : 'uk'});
        await this.colors.selectOption({label: 'Red'},{label:'Yellow'},{label:'Green'});
        await this.animals.selectOption({label:'Lion'});
        await this.date1.fill("02/23/2006");
        await this.date1.fill("15/03/2018");

        //Range date picker-
        await this.startDate.pressSequentially("03182026");
        await this.endDate.pressSequentially("04182026");

        await this.submit.click();
    }

    async uploadFiles() {
        await this.SingleFile.setInputFiles("C:/Users/Downloads/Sresume1.pdf");
        await this.uploadSingle.click();

        await this.MultipleFile.setInputFiles['C:/Users/Downloads/Salary-Slip-word.docx','C:/Users/Downloads/Sresume1.pdf'];
        await this.uploadMul.click();

    }

    async StaticWebTable(){
        
    }

}
export {HomePage};