const dbIssue = require('../../db_controller/issue_db')
const dbUser = require('../../db_controller/user_db')
const dbProject = require('../../db_controller/project_db')
const dbInit = require('../../db_controller/database_header')

var assert = require('assert')
const description = 'Description'
const difficulty = 1
const priority = 'Priority'
const usNum = 'UsNum'
const state = 'State'

class Issue {
    constructor (desc, diff, prio, us, state, proId) {
        this.description = desc
        this.difficulty = diff
        this.priority = prio
        this.us_num = us
        this.test_state = state
        this._project_id = proId
    }
}

describe('Test Issue', function () {
    const userName = 'userName'
    var projectId
    var expectedIssue
    var issueTest

    before(async function () {
        dbInit.databaseTestConnection()
        const email = 'email@test.com'
        const password = 'password'
        const projectName = 'projectName'
        await dbUser.insertUser(userName, email, password).then(async function () {
            await dbProject.insertProject(projectName, userName, description).then(async function () {
                await dbProject.findListProjectsByOwnerName(userName).then(async function (project) {
                    projectId = project[0]._project_id
                    expectedIssue = new Issue(description, difficulty, priority, usNum, state, projectId)
                    await dbIssue.insertIssue(description, difficulty, priority, usNum, state, projectId).then(async function () {
                        await dbIssue.findListIssuesByProjectID(projectId).then(function (issue) {
                            issueTest = issue[0]
                        })
                    })
                })
            })
        }, () => dbUser.deleteAccount(userName))
    })

    after(function () {
        dbUser.deleteAccount(userName)
    })

    function issueEqual (actualIssue, expectedIssue) {
        assert.strictEqual(actualIssue.description, expectedIssue.description)
        assert.strictEqual(actualIssue.difficulty, expectedIssue.difficulty)
        assert.strictEqual(actualIssue.priority, expectedIssue.priority)
        assert.strictEqual(actualIssue.us_num, expectedIssue.us_num)
        assert.strictEqual(actualIssue.test_state, expectedIssue.test_state)
        assert.strictEqual(actualIssue._project_id, expectedIssue._project_id)
    }

    it('issue insert', function () {
        issueEqual(issueTest, expectedIssue)
    })

    it('delete issue', async function () {
        await dbIssue.insertIssue(description, difficulty, priority, '626_US', state, projectId).then(async function () {
            await dbIssue.getIssueByUsNum('626_US', projectId).then(async function (issue) {
                await dbIssue.deleteIssue(projectId, issue[0]._issue_id).then(async function () {
                    await dbIssue.getIssueByUsNum('626_US', projectId).then(async function (deletedIssue) {
                        assert.strictEqual(deletedIssue[0], undefined)
                    })
                })
            })
        })
    })

    it('update issue', async function () {
        const newIssue = new Issue('update desc', 8, 'high', 'US-test_update', 'update-test', projectId)
        const tmpIssue = issueTest
        await dbIssue.updateIssue(projectId, issueTest._issue_id, 'update desc',
            8, 'high', 'US-test_update', 'update-test').then(async function () {
            await dbIssue.getIssuebyId(issueTest._issue_id).then(async function (updatedIssue) {
                issueEqual(updatedIssue[0], newIssue)
                await dbIssue.updateIssue(projectId, tmpIssue._issue_id, tmpIssue.description,
                    tmpIssue.difficulty, tmpIssue.priority, tmpIssue.us_num, tmpIssue.test_state)
            }, err => assert.strictEqual(true, false, err))
        })
    })

    it('wrong update issue', async function () {
        const tmpIssue = issueTest
        await dbIssue.updateIssue(projectId, issueTest._issue_id, 'update desc',
            'huit', '', 'US-test_update', 'update-test').then(async function () {
            await dbIssue.getIssuebyId(issueTest._issue_id).then(async function (updatedIssue) {
                await dbIssue.updateIssue(projectId, tmpIssue._issue_id, tmpIssue.description,
                    tmpIssue.difficulty, tmpIssue.priority, tmpIssue.us_num, tmpIssue.test_state).then(() => {
                    assert.strictEqual(true, false, 'the parameters does not correspond to the required ones')
                })
            })
        }, err => assert.strictEqual(true, true, err))
    })
})
