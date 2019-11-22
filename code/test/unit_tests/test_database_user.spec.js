const database = require('../../db_controller/user_db')

var assert = require('assert')
const testName = 'testName'
const testEmail = 'email@test.com'
const testPassword = 'testPassword'

describe('Test insertUser', function () {
    database.insertUser(testName, testEmail, testPassword).then(function () {
        database.findUserByName(testName).then(function (user) {
            it('should return the user\'s name', function () {
                assert.equal(testName, user.username)
            })
            it('should return the user\'s name', function () {
                assert.equal(testEmail, user.email)
            })
            it('should return the user\'s name', function () {
                assert.equal(testPassword, user.password)
            })
            database.deleteAccount(testName).then(function () {
                database.findUserByName(testName).then(function (deleteUser) {
                    assert.equal(deleteUser, undefined)
                })
            })
        })
    })
})
