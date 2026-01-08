import { chromium,expect,test } from "playwright/test";

test('Authentication popup test', async () => {

  const browser=await chromium.launch({headless:false,channel:'chrome'})
  const context=await browser.newContext({
   httpCredentials:{
          username:"admin",
          password:"admin",
      },
  });
  const pages=await context.newPage();
  await pages.goto('https://the-internet.herokuapp.com/basic_auth')
  const welcomeMsg=await pages.getByText('Congratulations! You must have the proper credentials.')
  expect(welcomeMsg).toContainText('Congratulations');
  browser.close()
});