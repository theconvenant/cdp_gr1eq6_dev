const database = require('../../db_controller/issue_db')

var assert = require('assert')
const description = 'Description'
const difficulty = 0
const priority = 'Priority'
const usNum = 'UsNum'
const state = 'State'
const projectId = -1

describe('Test insertIssue', function () {
    database.insertIssue(description, difficulty, priority, usNum, State, projectId).then(function () {
        database.findListIssuesByProjectID(projectId).then(function (issue) {
            it('should return the issue\'s description', function () {
                assert.equal(description, issue.description)
            })
            it('should return the issue\'s difficulty', function () {
                assert.equal(difficulty, issue.difficulty)
            })
            it('should return the issue\'s priority', function () {
                assert.equal(priority, issue.priority)
            })
            it('should return the issue\'s priority', function () {
                assert.equal(usNum, issue.us_num)
            })
            it('should return the issue\'s priority', function () {
                assert.equal(state, issue.test_state)
            })
            it('should return the issue\'s priority', function () {
                assert.equal(projectId, issue._project_id)
            })
            database.deleteIssue(projectId, issue._issue_id).then(function () {
                database.findListIssuesByProjectID(projectId).then(function (deletedIssue) {
                    assert.equal(deletedIssue, undefined)
                })
            })
        })
    })
})