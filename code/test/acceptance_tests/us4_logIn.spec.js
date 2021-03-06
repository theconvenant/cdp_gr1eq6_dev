// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())

describe('US4_logIn', function () {
    this.timeout(30000)
    let driver
    let vars
    beforeEach(async function () {
        driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build()
        vars = {}
    })
    afterEach(async function () {
        await driver.quit()
    })
    it('US4_logIn', async function() {
        await driver.get("http://localhost:8080/")
        await driver.manage().window().setRect(1920, 1128)
        await driver.findElement(By.name("username")).click()
        await driver.findElement(By.name("username")).sendKeys("userTest")
        await driver.findElement(By.name("password")).sendKeys("userPass")
        await driver.findElement(By.name("password")).sendKeys(Key.ENTER)
    })
})
