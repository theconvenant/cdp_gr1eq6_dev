const dbIssue = require('../../db_controller/issue_db')
const dbUser = require('../../db_controller/user_db')
const dbProject = require('../../db_controller/project_db')

var assert = require('assert')
const description = 'Description'
const difficulty = 1
const priority = 'Priority'
const usNum = 'UsNum'
const state = 'State'

describe('Test insertIssue', function () {
    const userName = 'userName'
    const email = 'email@test.com'
    const password = 'password'
    const projectName = 'projectName'
    let projectId = -1
    it('test_create_issue', function () {
        dbUser.insertUser(userName, email, password).then(function () {
            dbProject.insertProject(projectName, userName, description).then(function () {
                dbProject.findListProjectsByOwnerName(userName).then(function (project) {
                    projectId = project[0]._project_id
                    dbIssue.insertIssue(description, difficulty, priority, usNum, state, projectId).then(function () {
                        dbIssue.findListIssuesByProjectID(projectId).then(function (issue) {
                            const issueID = issue[0]._issue_id
                            assert.equal(description, issue[0].description)
                            assert.equal(difficulty, issue[0].difficulty)
                            assert.equal(priority, issue[0].priority)
                            assert.equal(usNum, issue[0].us_num)
                            assert.equal(state, issue[0].test_state)
                            assert.equal(projectId, issue[0]._project_id)
                            assert.notEqual(-1, issue[0]._project_id)
                            dbIssue.deleteIssue(projectId, issueID).then(function () {
                                dbIssue.findListIssuesByProjectID(projectId).then(function (deletedIssue) {
                                    assert.equal(deletedIssue[0], undefined)
                                    dbUser.deleteAccount(userName)
                                    // dbProject.deleteProject(projectName, userName)
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})
