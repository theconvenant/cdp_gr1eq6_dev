// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('test_create_issue', function () {
    this.timeout(30000)
    let driver
    let vars
    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build()
        vars = {}
    })
    afterEach(async function () {
        await driver.quit()
    })
    it('test_create_issue', async function () {
        await driver.get('http://localhost:8080/')
        await driver.findElement(By.name('username')).click()
        await driver.findElement(By.name('username')).sendKeys('user')
        await driver.findElement(By.name('password')).click()
        await driver.findElement(By.name('password')).sendKeys('pass')
        await driver.findElement(By.css('.w3-btn')).click()
        await driver.findElement(By.css('.Projects:nth-child(3) .w3-btn')).click()
        await driver.findElement(By.id('onglet_issues')).click()
        await driver.findElement(By.css('.w3-btn:nth-child(1)')).click()
        await driver.findElement(By.name('usNum')).click()
        await driver.findElement(By.name('usNum')).sendKeys('US1')
        await driver.findElement(By.name('description')).click()
        await driver.findElement(By.name('description')).sendKeys('test')
        await driver.findElement(By.name('difficulty')).click()
        await driver.findElement(By.name('difficulty')).sendKeys('1')
        await driver.findElement(By.name('priority')).click()
        await driver.findElement(By.name('priority')).sendKeys('2')
        await driver.findElement(By.name('state')).click()
        await driver.findElement(By.name('state')).sendKeys('TODO')
        await driver.findElement(By.css('.w3-btn:nth-child(11)')).click()
    })
})
