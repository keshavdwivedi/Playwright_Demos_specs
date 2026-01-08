import test, { Browser, expect, firefox,Page } from "playwright/test";

test('drag anc drop testing', async () => {
    const browser:Browser= await firefox.launch({headless:true,channel:'firefox'})
    const page:Page=await browser.newPage()
    await page.goto('https://the-internet.herokuapp.com/')
    await page.getByRole('link',{name:'Drag and Drop'}).click()
    await page.locator('div#column-a').dragTo(page.locator('div#column-b'))
    await browser.close()
    //await expect(page.locator('div#column-b>header').textContent()).toContain('A')
})
