import {test, chromium, expect } from "@playwright/test";

test.describe('slider automation testing', () => {
    
    test('slider automate', async () => {

        let flag:boolean=false;
        const targetAmount:string="1000000";

        const browser=await chromium.launch({headless:true,channel:'chrome'});
        const page=await browser.newPage();

        await page.goto("https://groww.in/calculators/sip-calculator")
        const sliderPoint=await page.locator('//div[@role="slider" and @aria-valuemax="1000000"]')
        expect.soft(sliderPoint).toBeEnabled()
        await page.locator('//div[@role="slider" and @aria-valuemax="1000000"]').click();
        const ele=await page.locator('#MONTHLY_INVESTMENT');
        const eleText=await ele.textContent()
        if (sliderPoint) {
            while(!flag){
              const bb = await sliderPoint.boundingBox();
              if (bb) {
               await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height/2);
               await page.mouse.down();
               await page.mouse.move(bb.x + 15, bb.y + bb.height/2)
               await page.mouse.up()
               let eleText=await ele.inputValue()
               if(eleText==targetAmount){
                 flag=true;
                }
              }
            }
          }  
       });
    });
