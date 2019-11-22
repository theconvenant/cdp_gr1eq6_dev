const database = require('../../db_controller/sprint_db')

var assert = require('assert')
const name = 'Name'
const startDate = 'StartDate'
const endDate = 'EndDate'
const projectId = 'ProjectId'
const description = 'Description'

//TODO Inutilisable sans les fonctions des sprint de la db

/*describe('Test insertSprint', function () {
    database.insertSprint(name, startDate, endDate, projectId, description).then(function () {
        database.findSprintByName(sprintId, projectId).then(function (sprint) {
            it('should return the sprint\'s name', function () {
                assert.equal(name, sprint.)
            })
            it('should return the sprint\'s startDate', function () {
                assert.equal(startDate, sprint.starting_date)
            })
            it('should return the sprint\'s endDate', function () {
                assert.equal(endDate, sprint.ending_date)
            })
            it('should return the sprint\'s projectId', function () {
                assert.equal(projectId, sprint._project_id)
            })
            it('should return the sprint\'s description', function () {
                assert.equal(description, sprint.description)
            })
            database.deleteSprint().then(function () {
                database.findSprintByName(sprintId, projectId).then(function (deletedSprint) {
                    assert.equal(deletedSprint, undefined)
                })
            })
        })
    })
})*/
