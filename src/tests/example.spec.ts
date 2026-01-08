import { test,expect,Browser,Locator, chromium, firefox, Page, } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });



test('xyz bank',async({page})=>{
  await page.goto('https://www.way2automation.com/angularjs-protractor/banking/#/login')
  await expect(page).toHaveTitle('Protractor practice website - Banking App')
  await expect(page.locator('div.center>a')).toHaveCount(2);
  await expect(page.locator('div.center>button')).toHaveCount(2);
})



test('google page test using browsercontexts', async () => {
  const browser:Browser=await firefox.launch({headless:true,channel:'firefox'})
  //first browser context properties 
  const browser_context1=await browser.newContext();
  const page1:Page=await browser_context1.newPage();

  await page1.goto('https://www.google.com/');
  await page1.getByTitle('Search').fill('selenium')
  await page1.keyboard.press('Enter')

  //second browser context properties 
  const browser_context2=await browser.newContext();
  const page2:Page=await browser_context2.newPage();

  await page2.goto('https://www.google.com/');
  await page2.getByTitle('Search').fill('playwright');
  await page1.keyboard.press('Enter')

  await browser_context1.close();
  await browser_context2.close();
  
  await browser.close();
})



// test.describe('xyz bank',()=>{

//   test('validate way to automation website title',async({page})=>{
//     await page.goto('https://www.way2automation.com/angularjs-protractor/banking/#/login')
//       console.log(page.title);
//       await expect(page).toHaveTitle("Protractor practice website - Banking App")
//   });

//   test('count anchor tag on homepage',async({page})=>{
//     await expect(page.locator('div.center>a')).toHaveCount(2);
//   });

// });
