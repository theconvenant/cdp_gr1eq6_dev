const sprintDb = require('../../db_controller/sprint_db')
const projectDb = require('../../db_controller/project_db')
const userDb = require('../../db_controller/user_db')
const issueDb = require('../../db_controller/issue_db')

var assert = require('assert')

describe('Test sprint', function () {
    const name = 'Name'
    const startDate = '2010-04-02'
    const endDate = '2010-04-11'
    const description = 'desc_test'
    const userName = 'test_bob'
    let projectId
    let sprintId
    let sprintTest

    before(async function () {
        await userDb.insertUser(userName, 'test_mail', 'password_test').then(async function () {
            await projectDb.insertProject('testProject', userName).then(async function () {
                await projectDb.findListProjectsByOwnerName(userName).then(async function (project) {
                    projectId = project[0]._project_id
                    await sprintDb.insertSprint(name, startDate, endDate, projectId, description).then(async function () {
                        await sprintDb.findSprintsByProjectId(projectId).then(sprint => {
                            sprintId = sprint[0]._id
                            sprintTest = sprint[0]
                        })
                    })
                })
            })
        }, () => userDb.deleteAccount(userName))
    })

    after(async function () {
        await sprintDb.deleteSprint(sprintId).then(async function () {
            await userDb.deleteAccount(userName)
        })
    })

    it('insert sprint', async function () {
        assert.strictEqual(sprintTest._id, sprintId)
        assert.strictEqual(sprintTest.name, name)
        assert.strictEqual(sprintTest._project_id, projectId)
        assert.strictEqual(sprintTest.description, description)
    })

    it('insert wrong paramter sprint', async function () {
        await sprintDb.insertSprint(name, '', '', projectId, description).then(async function () {
            await sprintDb.findSprintbyName(sprintTest.name, projectId).then(async function (sprint) {
                await sprintDb.deleteSprint(sprint[0]._id)
                assert.strictEqual(true, false, 'can not insert sprint with null paramters')
            })
        }, () => assert.strictEqual(true, true))
    })

    it('delete sprint', async function () {
        await sprintDb.deleteSprint(sprintId).then(async function () {
            await sprintDb.findSprintById(sprintId).then(async function (sprint) {
                assert.strictEqual(undefined, sprint)
                await sprintDb.insertSprint(name, startDate, endDate, projectId, description)
            }).catch(async function (err) {
                const ghost = err
                await sprintDb.insertSprint(name, startDate, endDate, projectId, description)
            })
        })
    })

    it('issue in sprint', async function () {
        const usNum = 'US_TEST'
        const issueDesc = 'desc test'
        const issueDiff = 132
        const issuePrio = 'high_test'
        const issueState = 'test_state'
        await issueDb.insertIssue(issueDesc, issueDiff, issuePrio, usNum, issueState, projectId).then(async function () {
            await issueDb.findListIssuesByProjectID(projectId).then(async function (issueList) {
                const issueId = issueList[0]._issue_id
                await sprintDb.insertIssueInSprint(sprintId, issueId).then(async function () {
                    await sprintDb.findIssueListOfSprint(sprintId, projectId).then(async function (sprintIssue) {
                        await issueDb.deleteIssue(projectId, issueId).then(() => {
                            assert.strictEqual(sprintIssue[0]._issue_id, issueId)
                            assert.strictEqual(sprintIssue[0].us_num, usNum)
                            assert.strictEqual(sprintIssue[0].description, issueDesc)
                            assert.strictEqual(sprintIssue[0].difficulty, issueDiff)
                            assert.strictEqual(sprintIssue[0].priority, issuePrio)
                            assert.strictEqual(sprintIssue[0].test_state, issueState)
                        })
                    }, () => issueDb.deleteIssue(projectId, issueId))
                }, () => issueDb.deleteIssue(projectId, issueId))
            })
        })
    })

    it('insert unknown issue in sprint', async function () { // to do
        sprintDb.insertIssueInSprint(sprintId, -1).then(async function () {
            await sprintDb.findIssueListOfSprint(sprintId, projectId).then(async function (sprintIssue) {
                await issueDb.deleteIssue(projectId, -1).then(() => {
                    assert.strictEqual(false, true, 'can not add an issue that does not exist')
                })
            })
        })
    })
})
