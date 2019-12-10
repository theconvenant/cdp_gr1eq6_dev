
const { Builder, By, Key, until } = require('selenium-webdriver')

const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())

describe('US3_deleteProject', function () {
    this.timeout(30000)
    let driver
    beforeEach(async function () {
        driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build()
    })
    afterEach(async function () {
        await driver.quit()
    })
  it('us3_deleteAccount', async function() {
    await driver.get("http://localhost:8080/")
    await driver.manage().window().setRect(814, 860)
    await driver.findElement(By.linkText("Create an account")).click()
    await driver.findElement(By.name("email")).click()
    await driver.findElement(By.name("email")).sendKeys("mail@mail.delete")
    await driver.findElement(By.name("username")).sendKeys("testDelete")
    await driver.findElement(By.name("password")).sendKeys("deletePass")
    await driver.findElement(By.css(".w3-btn")).click()
    await driver.findElement(By.css(".login-form")).click()
    await driver.findElement(By.name("username")).sendKeys("testDelete")
    await driver.findElement(By.name("password")).sendKeys("deletePass")
    await driver.findElement(By.css(".w3-btn")).click()
    await driver.findElement(By.css(".w3-display-topright:nth-child(2) h2")).click()
  })
})
