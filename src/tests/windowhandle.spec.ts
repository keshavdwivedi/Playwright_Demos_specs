import { chromium, expect, test } from "@playwright/test";

test.describe('window handling tests', () => {

    test('single window test', async () => {
     
        const browser=await chromium.launch({headless:true,channel:'chrome'})
        const parentpage=await browser.newPage();
        await parentpage.goto('https://www.lambdatest.com/selenium-playground/window-popup-modal-demo');
        await console.log('Main page URL:', parentpage.url());

  // Start waiting for the popup event *before* triggering the action
  const [newPage] = await Promise.all([
    parentpage.waitForEvent('popup'), // Waits for the new page object
    parentpage.getByRole('link', { name: 'Follow On Twitter' }).click()
  ]);
  await newPage.waitForLoadState(); // Ensures the new page is fully loaded
  console.log('New tab URL:', newPage.url());
  await expect(newPage).toHaveTitle('Profile / X'); 

   await parentpage.bringToFront();
  console.log('Back to main page:', parentpage.url());
  })
})



