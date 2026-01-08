import { test,Browser, expect, Page, chromium} from "@playwright/test";

test('xyz launch bank registration', async () => {

  const browser:Browser=await chromium.launch({headless:false,channel:'chrome'})
  const pages:Page=await browser.newPage();

  await pages.goto('https://www.way2automation.com/angularjs-protractor/banking/registrationform.html')
  await expect(pages).toHaveTitle('Registration Form')
  await pages.getByPlaceholder('Enter your first name').fill('Rahul')
  await pages.getByLabel('Last Name').fill('Mishra')
  await pages.locator('input#email').fill('rahul.mishra@gmail.com');
  await pages.getByPlaceholder('Enter your password').fill('Test@12345')
  await pages.getByRole('checkbox',{name:'Reading'}).check();
  await pages.getByRole('checkbox',{name:'Traveling'}).check();
  await pages.getByRole('checkbox',{name:'Sports'}).check();
  await pages.getByLabel('Gender').selectOption({label:'Male'});
  await pages.getByPlaceholder('Tell us about yourself').fill("Test input text for register");
  await pages.getByRole('button',{name:'Register'}).click();
  await pages.screenshot();
  await browser.close();

})