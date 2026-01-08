import { Browser, expect, firefox, Page, test} from "playwright/test";

test.describe('iFrame handling tests', () => {
    
    test('single iframe test', async () => {
        
        const browser:Browser=await firefox.launch({headless:false,channel:'firefox'})
        const page:Page=await browser.newPage();
        await page.goto('https://the-internet.herokuapp.com/iframe')
        const allframes=await page.frames();
        console.log("No: of frames "+allframes.length);
        const iframe=await page.frameLocator('#mce_0_ifr');
        await page.locator("div.tox-icon path[fill-rule='evenodd']").click();
        await iframe.locator('body#tinymce').dblclick();

    });

    test('multiple iframe test', async () => {
        const browser=await firefox.launch({headless:false,channel:'firefox'})
        const page= await browser.newPage();
        await page.goto('https://www.dezlearn.com/nested-iframes-example/')
        const framecount=await page.frames();
        console.log("No: of frames are "+framecount.length);
        const parentFrame=await page.frameLocator('#parent_iframe');
        expect(await parentFrame.getByRole('heading',{name:'Parent iframe'})).toBeVisible();
        await parentFrame.locator('#u_5_5').click();
        const innerFrame=await parentFrame.frameLocator('#iframe1');
        await innerFrame.locator('#u_5_6').click();
    })
});
