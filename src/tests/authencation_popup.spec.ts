import { chromium,expect,test } from "playwright/test";

test('Authentication popup test', async () => {

  const browser=await chromium.launch({headless:true,channel:'chrome'})
  const context=await browser.newContext({
   httpCredentials:{
          username:"admin",
          password:"admin",
      },
  });
  const pages=await context.newPage();
  await pages.goto('https://the-internet.herokuapp.com/basic_auth')
  const welcomeMsg=await pages.getByRole('heading',{name:"Basic Auth"});
  await expect(welcomeMsg).toBeTruthy();
  await browser.close();
});