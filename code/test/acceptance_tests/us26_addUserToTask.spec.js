
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
  it('us26_addUserToTask', async function() {
    await driver.get("http://localhost:8080/")
    await driver.manage().window().setRect(850, 860)
    await driver.findElement(By.name("username")).click()
    await driver.findElement(By.name("username")).sendKeys("userTest")
    await driver.findElement(By.name("password")).sendKeys("userPass")
    await driver.findElement(By.css(".w3-btn")).click()
    await driver.findElement(By.css(".w3-btn:nth-child(1)")).click()
    await driver.findElement(By.name("projectName")).click()
    await driver.findElement(By.name("projectName")).sendKeys("add user to task")
    await driver.findElement(By.name("description")).sendKeys("test")
    await driver.findElement(By.css(".w3-btn:nth-child(5)")).click()
    await driver.findElement(By.css(".Projects:nth-child(2) .w3-btn")).click()
    await driver.findElement(By.id("onglet_projectManagement")).click()
    await driver.findElement(By.css(".w3-green:nth-child(1)")).click()
    await driver.findElement(By.name("userName")).click()
    await driver.findElement(By.name("userName")).sendKeys("guestUser")
    await driver.findElement(By.css(".w3-btn:nth-child(3)")).click()
    await driver.findElement(By.id("onglet_tasks")).click()
    await driver.findElement(By.css(".w3-btn:nth-child(1)")).click()
    await driver.findElement(By.name("taskId")).click()
    await driver.findElement(By.name("taskId")).sendKeys("1")
    await driver.findElement(By.name("description")).sendKeys("test add user")
    await driver.findElement(By.name("member")).click()
    await driver.findElement(By.css(".w3-btn:nth-child(23)")).click()
  })
})
