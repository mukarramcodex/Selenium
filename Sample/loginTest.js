// const { Builder, By, until } = require('selenium-webdriver');
import { Builder, By, until } from 'selenium-webdriver';

(async function loginTest() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // 1. Open the login page
    await driver.get('https://the-internet.herokuapp.com/login');

    // 2. Enter valid credentials
    await driver.findElement(By.id('username')).sendKeys('tomsmith');
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!');
    await driver.findElement(By.css('button[type="submit"]')).click();

    // 3. Wait and check success message
    const success = await driver.wait(
      until.elementLocated(By.css('.flash.success')),
      5000
    );
    const message = await success.getText();

    if (message.includes('You logged into a secure area!')) {
      console.log('✅ Login Successful Test Passed');
    } else {
      console.log('❌ Login Successful Test Failed');
    }

    // 4. Logout
    await driver.findElement(By.css('a.button.secondary.radius')).click();

    // 5. Try login with invalid credentials
    await driver.findElement(By.id('username')).sendKeys('wronguser');
    await driver.findElement(By.id('password')).sendKeys('wrongpass');
    await driver.findElement(By.css('button[type="submit"]')).click();

    const error = await driver.wait(
      until.elementLocated(By.css('.flash.error')),
      5000
    );
    const errorMsg = await error.getText();

    if (errorMsg.includes('Your username is invalid!')) {
      console.log('✅ Invalid Login Test Passed');
    } else {
      console.log('❌ Invalid Login Test Failed');
    }
  } catch (error) {
    console.error('❌ Test Error:', error);
  } finally {
    await driver.quit();
  }
})();
