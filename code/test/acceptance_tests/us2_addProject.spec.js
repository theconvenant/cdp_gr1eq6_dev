const webdriver = require('selenium-webdriver')
const By = webdriver.By
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())

describe('US', function () {
    this.timeout(30000)
    let driver

    beforeEach(async function () {
        driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build()
    })

    afterEach(async function () {
        await driver.quit()
    })

    it('US2_addProject', async function() {
        await driver.get("http://localhost:8080/")
        await driver.manage().window().setRect(960, 1200)
        await driver.findElement(By.name("username")).click()
        await driver.findElement(By.name("username")).sendKeys("userTest")
        await driver.findElement(By.name("password")).sendKeys("userPass")
        await driver.findElement(By.css(".w3-btn")).click()
        await driver.findElement(By.css(".w3-btn:nth-child(1)")).click()
        await driver.findElement(By.name("projectName")).click()
        await driver.findElement(By.name("projectName")).sendKeys("projet test")
        await driver.findElement(By.name("description")).sendKeys("ceci est un test selenium")
        await driver.findElement(By.css(".w3-btn:nth-child(5)")).click()
    })
})
