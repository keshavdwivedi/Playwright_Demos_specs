import test, { Browser, expect, firefox,Page } from "playwright/test";

async function openDropdown(page: Page) {
  // Click the toggle, then wait for the menu to become visible/stable.
  await page.click('#menu1');
  await page.locator('ul.dropdown-menu[role="menu"]').waitFor({ state: 'visible' });
}

async function clickMenuItemByText(page: Page, visibleText: string) {
  await openDropdown(page);

  // Preferred: use accessible-role based locator if role attributes are present
  const itemByRole = page.getByRole('menuitem', { name: visibleText });
  if (await itemByRole.count() > 0) {
    await expect(itemByRole).toBeVisible();
    await itemByRole.click();
    return;
  }

  // Fallback: CSS locator matching text
  const cssLocator = page.locator(`ul.dropdown-menu >> a[role="menuitem"]:has-text("${visibleText}")`);
  await expect(cssLocator).toBeVisible();
  await cssLocator.click();
}

async function bootstrapGetAllMenuTexts(page: Page) {
  await openDropdown(page);
  const items = page.locator('ul.dropdown-menu a[role="menuitem"]');
  // allTextContents preserves array of visible text for each element
  return await items.allTextContents();
}

async function normalDropdownByIndex(page:Page,indexVal:number) {
    await page.getByRole('link',{name:'Dropdown'}).click()
    const dropdownoption='select#dropdown';
    await page.selectOption(dropdownoption,{index:indexVal})
}

async function normalDropdownByValue(page:Page,val:string) {
     await page.getByRole('link',{name:'Dropdown'}).click()
     const dropdownoption='select#dropdown';
     await page.selectOption(dropdownoption,{value:val});
}

async function normalDropdownByLabel(page:Page,labelVal:string) {
     await page.getByRole('link',{name:'Dropdown'}).click()
     const dropdownoption='select#dropdown';
     await page.selectOption(dropdownoption,{label:labelVal})
}

async function normalAllMenutexts(page:Page) {
    await page.getByRole('link',{name:'Dropdown'}).click()
    const dropdownoption='select#dropdown';

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
}

async function countitemsforDynamictext(page:Page,searchBoxText:string) {

      const searchBox=await page.locator(`//input[@id='searchbox']`);
      await searchBox.pressSequentially(searchBoxText,{delay:1000});
      const listItems=await page.locator("ul#ui-id-1>li").count()
      await console.log("The total elements are ",listItems)
}

async function selectDynamicDropdown(page:Page,searchBoxText:string,countryText:string) {
  
    const searchBox=await page.locator(`//input[@id='searchbox']`);
    await searchBox.pressSequentially(searchBoxText,{delay:1000});

  const itemByRole = page.getByRole('menuitem', { name: countryText});
  if (await itemByRole.count() > 0) {
    await expect(itemByRole).toBeVisible();
    await itemByRole.click();
    return;
  }
}



test.describe('normal Dropdown tests', () => {
    
    test('normal dropdown test by index', async () => {
    const browser:Browser=await firefox.launch({channel:'firefox',headless:true})
    const page:Page=await browser.newPage();
    await page.goto('https://the-internet.herokuapp.com/')
    await normalDropdownByIndex(page,1)
    });

    test('normal dropdown test by value', async () => {
    const browser:Browser=await firefox.launch({channel:'firefox',headless:true})
    const page:Page=await browser.newPage();
    await page.goto('https://the-internet.herokuapp.com/')
    await normalDropdownByValue(page,'1')
    });

    test('normal dropdown test by label', async () => {
    const browser:Browser=await firefox.launch({channel:'firefox',headless:true})
    const page:Page=await browser.newPage();
    await page.goto('https://the-internet.herokuapp.com/')
    await normalDropdownByLabel(page,'Option 2')
    });

    test('read all menu options of normal text', async () => { 
    const browser = await firefox.launch({headless:true,channel:"firefox"})
    const page=await browser.newPage();
     await page.goto('https://the-internet.herokuapp.com/')
     await normalAllMenutexts(page);
    });
});

test.describe('bootstrap dropdown tests', () => {
    
   test('read all option texts of bootstrap dropdown', async () => {
   const browser = await firefox.launch({headless:true,channel:"firefox"})
   const page=await browser.newPage();
    await page.goto("https://seleniumpractise.blogspot.com/2016/08/bootstrap-dropdown-example-for-selenium.html")
    const texts = await bootstrapGetAllMenuTexts(page);
    console.log('dropdown items:', texts);
    expect(texts.length).toBeGreaterThan(0);
    // Example: assert an expected option exists
     expect(texts).toContain('JavaScript');

  });

 test('select "JavaScript" using visible text', async () => {
     const browser = await firefox.launch({headless:true,channel:"firefox"})
     const page=await browser.newPage();
     await page.goto("https://seleniumpractise.blogspot.com/2016/08/bootstrap-dropdown-example-for-selenium.html")
     await clickMenuItemByText(page, 'JavaScript');
  });

});

test.describe('autosuggestions dropdowns tests', () => {

    test('count suggestion items for specific text of dropdown ', async () => {
    const browser=await firefox.launch({headless:true,channel:"firefox"});
    const page=await browser.newPage();
    await page.goto("https://demo.automationtesting.in/AutoComplete.html")
    await countitemsforDynamictext(page,"in")
    })
    

    test('dynamic dropdown test with autosuggestions', async () => {
    
    const browser=await firefox.launch({headless:true,channel:"firefox"});
    const page=await browser.newPage();
    await page.goto("https://demo.automationtesting.in/AutoComplete.html")
    await selectDynamicDropdown(page,"new","New Zealand")
 })  
})






