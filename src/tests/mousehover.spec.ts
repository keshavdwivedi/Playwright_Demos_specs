import { Browser, expect, Page, test, webkit } from "@playwright/test";

test.describe('mouse hovering tests', () => {
    
    test('mouse hover test', async () => {
    const browser:Browser=await webkit.launch({headless:false,channel:'webkit'})
    const page:Page=await browser.newPage();
    await page.goto('https://the-internet.herokuapp.com/')
    await page.getByRole('link', { name: 'Hovers' }).click()
    await page.getByAltText('User Avatar').first().hover()
    await expect(page.getByRole('heading',{name:'name: user1'})).toBeVisible()

    //validation of hover on menus and submenus
    await page.goBack()
    await page.getByText('JQuery UI Menus').click()
    await page.getByRole('link',{name:'Enabled'}).hover()
    await page.getByRole('link',{name:'Downloads'}).hover()
    await expect(page.locator('li#ui-id-4>ul>li')).toHaveCount(3)
    //await expect(page.locator('li#ui-id-4>ul>li')).toBeVisible()

    browser.close();
    
});

test('focus on element and type using character by character or click on it', async () => {
     const browser:Browser=await webkit.launch({headless:false,channel:'webkit'})
     const page:Page=await browser.newPage();
     await page.goto('https://the-internet.herokuapp.com/')
     await page.getByRole('link', { name: 'Form Authentication' }).click()
     const Username='input#username'
     const Password='input#password'

     await page.locator(Username).focus()
     await page.locator(Username).pressSequentially('tomsmith',{delay:400})

     await page.locator(Password).focus()
     await page.locator(Password).pressSequentially('SuperSecretPassword!',{delay:400})

     await page.getByRole('button',{name:' Login'}).focus()
     await page.getByRole('button',{name:' Login'}).click()

     await expect(page.getByRole('heading',{name:' Secure Area', exact:true})).toBeVisible()

     await expect (page.getByRole('link',{name:' Logout'})).toBeEnabled()

     await page.getByRole('link',{name:' Logout'}).click()

     await expect(page.getByRole('link',{name:'×'})).toBeVisible();

     await page.waitForTimeout(3000)
 });

});




