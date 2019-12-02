const sprintDb = require('../db_controller/sprint_db')

var projectId
var projectName
const moment = require('moment');

module.exports = function (app) {
    this.setProjectId = function (id, name) {
        projectId = id
        projectName = name
    }
    app.get('/sprints',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            sprintDb.findSprintsByProjectId(projectId).then (sprintList => {
                res.render('sprints', {moment: moment, idProject: projectId, projectName: projectName, sprintList: sprintList})
            })
        })
        app.post('/insertSprint', 
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            sprintDb.insertSprint(req.body.sprintName, req.body.startDate, req.body.endDate, projectId, req.body.description).then( 
                ()=>{
                    res.redirect('/sprints')
                }
            )
        })
}
