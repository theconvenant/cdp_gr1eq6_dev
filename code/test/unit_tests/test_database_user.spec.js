const dbUser = require('../../db_controller/user_db')

var assert = require('assert')
const userName = 'userName'
const email = 'email@test.com'
const password = 'password'

describe('Test insertUser', function () {
    it('create_user', function () {
        dbUser.insertUser(userName, email, password).then(function () {
            dbUser.findUserByName(userName).then(function (user) {
                assert.equal(userName, user[0].description)
                assert.equal(email, user[0].difficulty)
                assert.equal(password, user[0].priority)
                dbUser.deleteAccount(userName)
            })
        })
    })
})
