const dbProject = require('../../db_controller/project_db')
const dbUser = require('../../db_controller/user_db')
const dbInit = require('../../db_controller/database_header')

var assert = require('assert')

describe('Test project', function () {
    const projectName = 'testProjectName'
    const ownerName = 'testOwnerName'
    const description = 'Description'

    const email = 'email@test.com'
    const password = 'password'

    var projectTest

    before(async function () {
        dbInit.databaseTestConnection()
        await dbUser.insertUser(ownerName, email, password).then(async function () {
            await dbProject.insertProject(projectName, ownerName, description).then(async function () {
                await dbProject.findListProjectsByOwnerName(ownerName).then(function (insertedProject) {
                    projectTest = insertedProject[0]
                })
            })
        })
    })

    after(function () {
        dbUser.deleteAccount(ownerName)
    })

    it('project name correct', function () {
        assert.strictEqual(projectTest._project_name, projectName)
    })

    it('owner name correct', function () {
        assert.strictEqual(projectTest._owner_name, ownerName)
    })

    it('description correct', function () {
        assert.strictEqual(projectTest.description, description)
    })

    it('insert twice the same project', async function () {
        await dbProject.insertProject(projectName, ownerName, description).then(function () {
            assert.strictEqual(true, false, 'should not be able to add twice the same project')
        }, function (err) {
            const ghost = err
            assert.strictEqual(true, true)
        })
    })

    it('insert project with unkwown userName', async function () {
        const wrongUserName = 'bob dylan'
        await dbProject.insertProject(projectName, wrongUserName, description).then(function () {
            assert.strictEqual(true, false, 'you should not add a project to an unknown user')
        }, function (err) {
            const ghost = err
            assert.strictEqual(true, true)
        })
    })

    it ('insert error', async function () {
        const errProjectName = ''
        await dbProject.insertProject(errProjectName, projectTest._owner_name).then(function () {
            assert.strictEqual(true, false, 'the parameters does not correspond to the required ones')
        }, function (err) {
            const ghost = err
            assert.strictEqual(true, true)
        })
    })

    it('add user to project', async function () {
        const addUserName = 'addTest'
        await dbUser.insertUser(addUserName, 'emailTest', 'passwordAdd').then(async function () {
            await dbProject.insertUserProject(addUserName, projectTest._project_id).then(async function () {
                await dbProject.findMembersOfProjectID(projectTest._project_id).then(memberList => {
                    dbUser.deleteAccount(addUserName)
                    assert.strictEqual(memberList[0]._user_name, addUserName)
                })
            }, () => dbUser.deleteAccount(addUserName))
        })
    })

    it('add unknown user to project', async function () {
        const wrongUserName = 'bob dylan'
        await dbProject.insertUserProject(wrongUserName, projectTest._project_id).then(function () {
            dbProject.removeMemberFromProject(projectTest._project_id, wrongUserName)
            assert.strictEqual(true, false, 'a member that does not exist can not be added to a project')
        }, function (err) {
            const ghost = err
            assert.strictEqual(true, true)
        })
    })

    it('remove member from a project', async function () {
        const usrName = 'test member'
        await dbUser.insertUser(usrName, 'emailTest', 'passwordAdd').then(async function () {
            await dbProject.insertUserProject(usrName, projectTest._project_id).then(async function () {
                await dbProject.findMembersOfProjectID(projectTest._project_id).then(async function (memberList) {
                    const memberListSize = memberList.length
                    await dbProject.removeMemberFromProject(projectTest._project_id, usrName).then(async function () {
                        dbProject.findMembersOfProjectID(projectTest._project_id).then(list => {
                            dbUser.deleteAccount(usrName)
                            assert.strictEqual(list.length, memberListSize - 1)
                        })
                    }, () => dbUser.deleteAccount(usrName))
                }, () => dbUser.deleteAccount(usrName))
            }, () => dbUser.deleteAccount(usrName))
        }, () => dbUser.deleteAccount(usrName))
    })
})
