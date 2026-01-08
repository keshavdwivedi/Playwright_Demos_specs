import test, { Browser, firefox,Page } from "playwright/test";

test('dropdown tests', async () => {
    const browser:Browser=await firefox.launch({channel:'firefox',headless:true})
    const page:Page=await browser.newPage();
    await page.goto('https://the-internet.herokuapp.com/')
    await page.getByRole('link',{name:'Dropdown'}).click()
    const dropdownoption='select#dropdown';
    await page.selectOption(dropdownoption,{value:'1'});
    await page.selectOption(dropdownoption,{label:'Option 2'})
    await page.selectOption(dropdownoption,{index:1})

    //get text of all options and break on the given condition 

    const alloptions=await page.$$(dropdownoption+' > option')
    console.log("the total number of menu options in dropdown are : "+alloptions.length);

    for(const e of alloptions){
        const text=await e.textContent();
        console.log("The options in dropdown are : "+text)
        if (text=='Option 2') {
            await page.selectOption(dropdownoption,{label:text})
            break;
        }
    }
});

