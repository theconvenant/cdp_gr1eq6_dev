const dbUser = require('../../db_controller/user_db')

var assert = require('assert')

describe('Test user', function () {
    const userName = 'userName'
    const email = 'email@test.com'
    const password = 'password'

    it('insert user', async function () {
        await dbUser.insertUser(userName, email, password).then(async function () {
            await dbUser.findUserByName(userName).then(function (user) {
                assert.strictEqual(userName, user[0].username)
                assert.strictEqual(email, user[0].email)
                assert.strictEqual(password, user[0].password)
            }, () => dbUser.deleteAccount(userName)).catch(err => {
                const ghost = err
                dbUser.deleteAccount(userName)
            })
        })
    })

    it('insert wrong parameter user', async function () {
        await dbUser.insertUser(12, '', password).then(async function () {
            dbUser.deleteAccount(userName).then(
                () => assert.strictEqual(true, false, 'can not insert user with wrong paramters'))
        }, () => assert.strictEqual(true, true))
    })

    it('delete user', async function () {
        await dbUser.insertUser(userName, email, password).then(async function () {
            await dbUser.deleteAccount(userName).then(async function () {
                await dbUser.findUserByName(userName).then(userDeleted => {
                    assert.strictEqual(userDeleted, undefined)
                })
            })
        }, dbUser.deleteAccount(userName))
    })
})
