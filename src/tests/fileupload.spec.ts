import path from "path";
import test, { Browser, webkit, Page, expect} from "playwright/test";



test.describe('File upload testing',() => {

   test('single file upload testing', async () => {
    const browser:Browser= await webkit.launch({channel:'webkit',headless:true})
    const page:Page= await browser.newPage();
    await page.goto('https://the-internet.herokuapp.com/')
    await page.getByRole('link',{name:'File Upload'}).click()
    await page.locator('input#file-upload').setInputFiles('/Users/keshavmac/Cy-Workspace/Playwright_demos/src/tests/resources/test.csv')
    await page.locator('input#file-submit').click()
    await expect(page.getByRole('heading',{name:'File Uploaded!'})).toBeVisible()
    await browser.close()
});

test('multiple file uploading', async () => {
    const browser:Browser= await webkit.launch({channel:'webkit',headless:true})
    const page:Page= await browser.newPage();
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php')
    //uploading multiple files
    await page.locator('input#filesToUpload').
        setInputFiles([
        path.join("/Users/keshavmac/Cy-Workspace/Playwright_demos/src/tests/resources/test.csv"),path.join('/Users/keshavmac/Cy-Workspace/Playwright_demos/src/tests/resources/test.json'),path.join('/Users/keshavmac/Cy-Workspace/Playwright_demos/src/tests/resources/test.txt')])
   
        /*deselecting all uploaded files
   await page.locator('input#filesToUpload').setInputFiles([]);*/

    //  await expect(page.getByRole('listitem',{name:''})).toHaveCount(3);
    //  await expect(page.getByRole('listitem', { name: 'test.csv' })).toBeVisible();
     //await expect(page.getByRole('listitem', { name: 'test.json' })).toBeVisible();
      //await expect(page.getByRole('listitem', { name: 'test.txt' })).toBeVisible();
})

test('file upload by buffer memory: upload by creating file at run time', async () => {

    const browser:Browser= await webkit.launch({channel:'webkit',headless:true})
    const page:Page= await browser.newPage();
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php')
    await page.locator('input#filesToUpload').setInputFiles({
        name:"test.pdf",
        mimeType:"application/pdf",
        "buffer":Buffer.from("this is test pdf file for file upload")
    })
})

test('multiple file upload by buffer memory: upload by creating file at run time', async () => {

    const browser:Browser= await webkit.launch({channel:'webkit',headless:true})
    const page:Page= await browser.newPage();
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php')
    await page.locator('input#filesToUpload').setInputFiles([
        {
        name:"test.pdf",
        mimeType:"application/pdf",
        "buffer":Buffer.from("this is test pdf file for file upload")
    },
     {
        name:"test.txt",
        mimeType:"application/plain",
        "buffer":Buffer.from("this is test text file for file upload")
    },
  ])
 }) 
});



