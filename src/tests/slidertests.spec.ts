import {test, webkit } from "@playwright/test";

test.describe('slider automation testing', () => {
    
    test('slider automate', async () => {

        const value:number=15;

        const browser=await webkit.launch({headless:true,channel:'webkit'});
        const page=await browser.newPage();

        await page.goto("https://www.flipkart.com/")
        await page.locator(`a[href="/computers/computer-peripherals/projectors/pr?sid=6bo%2Ctia%2C1hx&fm=neo%2Fmerchandising&iid=M_0cc842bf-96c6-4409-b385-b0a904682f33_2_372UD5BXDFYS_MC.ICU0BSHGNPBF&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_4_L2_view-all&cid=ICU0BSHGNPBF&p%5B%5D=facets.fulfilled_by%255B%255D%3DFlipkart%2BAssured&p%5B%5D=facets.brand%255B%255D%3DEgate&ctx=eyJjYXJkQ29udGV4dCI6eyJhdHRyaWJ1dGVzIjp7InZhbHVlQ2FsbG91dCI6eyJtdWx0aVZhbHVlZEF0dHJpYnV0ZSI6eyJrZXkiOiJ2YWx1ZUNhbGxvdXQiLCJpbmZlcmVuY2VUeXBlIjoiVkFMVUVfQ0FMTE9VVCIsInZhbHVlcyI6WyJGcm9tIOKCuTY5OTAiXSwidmFsdWVUeXBlIjoiTVVMVElfVkFMVUVEIn19LCJ0aXRsZSI6eyJtdWx0aVZhbHVlZEF0dHJpYnV0ZSI6eyJrZXkiOiJ0aXRsZSIsImluZmVyZW5jZVR5cGUiOiJUSVRMRSIsInZhbHVlcyI6WyJQcm9qZWN0b3IiXSwidmFsdWVUeXBlIjoiTVVMVElfVkFMVUVEIn19LCJoZXJvUGlkIjp7InNpbmdsZVZhbHVlQXR0cmlidXRlIjp7ImtleSI6Imhlcm9QaWQiLCJpbmZlcmVuY2VUeXBlIjoiUElEIiwidmFsdWUiOiJQUk9GU0ZYTlpWMkNBWlk2IiwidmFsdWVUeXBlIjoiU0lOR0xFX1ZBTFVFRCJ9fX19fQ%3D%3D"]`).click();
        //await page.locator(`div > div._3n8fna1co > div`).getByRole('link').first().click();
        const sliderPoint=page.locator(`div.egvN4t > div.lPYKVv > div.G12X4V`).first();
        const bb = await sliderPoint.boundingBox();
        if (!bb) {
          throw new Error('Could not get bounding box for slider (element might be detached or not visible).');
        }
        await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height);
        await page.mouse.down();
        await page.mouse.move(bb.x + 40, bb.y + bb.height)
        await page.mouse.up()
    })
})
