
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
  it('us17_createSprint', async function() {
    await driver.get("http://localhost:8080/")
    await driver.manage().window().setRect(814, 867)
    await driver.findElement(By.name("username")).click()
    await driver.findElement(By.name("username")).sendKeys("userTest")
    await driver.findElement(By.name("password")).sendKeys("userPass")
    await driver.findElement(By.css(".w3-btn")).click()
    await driver.findElement(By.css(".w3-btn:nth-child(1)")).click()
    await driver.findElement(By.name("projectName")).click()
    await driver.findElement(By.name("projectName")).sendKeys("create sprint")
    await driver.findElement(By.name("description")).sendKeys("test")
    await driver.findElement(By.css(".w3-btn:nth-child(5)")).click()
    await driver.findElement(By.css(".Projects:nth-child(2) .w3-btn")).click()
    await driver.findElement(By.id("onglet_sprints")).click()
    await driver.findElement(By.css(".w3-margin:nth-child(6) > .w3-btn")).click()
    await driver.findElement(By.name("sprintName")).click()
    await driver.findElement(By.name("sprintName")).sendKeys("sprint test")
    await driver.findElement(By.name("description")).sendKeys("test")
    await driver.findElement(By.name("startDate")).click()
    await driver.findElement(By.name("startDate")).sendKeys("2019-12-10")
    await driver.findElement(By.name("endDate")).click()
    await driver.findElement(By.name("endDate")).sendKeys("2019-12-17")
    await driver.findElement(By.css(".w3-btn:nth-child(9)")).click()
  })
})
