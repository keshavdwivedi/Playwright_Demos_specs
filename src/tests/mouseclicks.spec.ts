import test, { Browser, expect, firefox, Page } from "playwright/test";

test('mouseclicks tests ', async () => {
    const browser:Browser=await firefox.launch({headless:false,channel:'firefox'})
    const page:Page=await browser.newPage();
    await page.goto('https://the-internet.herokuapp.com/')
    await page.getByRole('link',{name:'Context Menu'}).click();
    await page.locator('div#hot-spot').click({button:"right"})
    await page.goBack()
    await page.getByRole('link',{name:'Add/Remove Elements'}).click()
    await page.getByRole('button',{name:'Add Element'}).dblclick()
    await expect(page.locator('div#elements>button')).toHaveCount(2)
    browser.close();
})
