const database = require('../../db_controller/project_db')

var assert = require('assert')
const projectName = 'testProjectName'
const ownerName = 'testOwnerName'
const description = 'Description'

describe('Test insertProject', function () {
    database.insertProject(projectName, ownerName, description).then(function () {
        database.findListProjectsByOwnerName(ownerName).then(function (project) {
            it('should return the project\'s name', function () {
                assert.equal(projectName, project._project_name)
            })
            it('should return the owner\'s name', function () {
                assert.equal(ownerName, project._owner_name)
            })
            it('should return the project\'s description', function () {
                assert.equal(description, project.description)
            })
            database.deleteProject(projectName, ownerName).then(function () {
                database.findListProjectsByOwnerName(ownerName).then(function (deletedProject) {
                    assert.equal(deletedProject, undefined)
                })
            })
        })
    })
})