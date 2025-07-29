// const { Builder, By, Key, until } = require('selenium-webdriver');
import { Builder, By, Key, until } from "selenium-webdriver";

(async function runTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.google.com');
    await driver.findElement(By.name('q')).sendKeys('Selenium WebDriver', Key.RETURN);
    await driver.wait(until.titleContains('Selenium'), 5000);
    console.log(await driver.getTitle());
  } finally {
    await driver.quit();
  }
})();
