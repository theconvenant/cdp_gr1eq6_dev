const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const databaseSelect = require('./controller/database_select')
const databaseInsert = require('./controller/database_insert')
const databaseDelete = require('./controller/database_delete')
const authenticate = require('./models/authenticate')

var projectId = null

app.use(require('morgan')('combined'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require('express-session')({ secret: 'Secret key', resave: false, saveUninitialized: false }))

app.use(authenticate.passport.initialize())
app.use(authenticate.passport.session())

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '.', '/views'))
app.use(express.static(path.join(__dirname, '.', 'views')))

app.get('/', function (req, res) {
    res.render('index')
})

app.get('/register', function (req, res) {
    res.render('register')
})

app.post('/register', function (req, res) {
    res.render('register')
})

app.get('/summary',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.render('summary', { idProject: req.params.idProject })
    })

app.post('/summary',
    function (req, res) {
        projectId = req.body.idProject
        console.log('project wowo ID  = ' + projectId)
        res.render('summary', { idProject: projectId })
    })

app.get('/tasks', require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        databaseSelect.findTasksByProjectId(projectId).then(taskList => {
            databaseSelect.findListIssuesByProjectID(projectId).then(issueList => {
                res.render('tasks', { taskList: taskList, issueList: issueList, idProject: projectId })
            }
            )
        })
    })

app.post('/tasks', require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        console.log('project tasks ID  = ' + projectId)
        databaseSelect.findTasksByProjectId(projectId).then(taskList => {
            databaseSelect.findListIssuesByProjectID(projectId).then(issueList => {
                res.render('tasks', { taskList: taskList, issueList: issueList, idProject: projectId })
            }
            )
        })
    })

app.post('/insertTasks', function (req, res) {
    if (req.body.issueId === '') {
        databaseInsert.insertTask(req.body.taskId, req.body.description,
            req.body.state, projectId)
            .catch(err => console.log(err))
    } else {
        databaseInsert.insertTask(req.body.taskId, req.body.description,
            req.body.state, projectId, req.body.issueId)
            .catch(err => console.log(err))
    }
    res.redirect('/tasks', { projectId: projectId })
})

app.post('/updateTask', function (req, res) {
    databaseInsert.updateTask(projectId, req.body.taskId, req.body.description,
        req.body.state, req.body.issueId)
    res.redirect('/tasks')
})

app.post('/deleteTask', function (req, res) {
    databaseDelete.deleteTask(projectId, req.body.taskId)
    res.redirect('/tasks')
})

app.get('/tests',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.render('tests', { idProject: projectId })
    })

app.post('/tests',
    function (req, res) {
        res.redirect('/tests')
    })

app.get('/sprints',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.render('sprints', { idProject: projectId })
    })

app.post('/sprints',
    function (req, res) {
        res.redirect('/sprints')
    })

app.get('/releases',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.render('releases', { idProject: projectId })
    })

app.post('/releases',
    function (req, res) {
        res.redirect('/releases')
    })

app.get('/documentation',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.render('documentation', { idProject: projectId })
    })

app.post('/documentation',
    function (req, res) {
        res.redirect('/documentation')
    })

app.get('/projectManagement',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.render('projectManagement', { idProject: projectId })
    })

app.post('/projectManagement',
    function (req, res) {
        res.redirect('/projectManagement')
    })

app.post('/',
    authenticate.passport.authenticate('local', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/projects')
    })

app.get('/projects',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        databaseSelect.findListProjectsByOwnerName(req.user.username).then(function (projectsOwner) {
            databaseSelect.findListProjectsByUser(req.user.username).then(function (projectsMember) {
                res.render('projects', { projectsOwner: projectsOwner, projectsMember: projectsMember })
            })
        })
    })

app.post('/projects', function (req, res) {
    console.log(req.body.projectName + req.body.projectName.length)
    if (req.body.projectName.length !== 0) {
        if (req.body.description.length === 0) {
            databaseInsert.insertProject(req.body.projectName, req.user.username)
        } else {
            databaseInsert.insertProject(req.body.projectName, req.user.username, req.body.description)
        }
    }
    res.redirect('/projects')
})

app.get('/issues',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.render('issues', { idProject: projectId })
    })

app.post('/issues',
    function (req, res) {
        res.render('issues', { idProject: projectId })
    })

app.get('/logout',
    function (req, res) {
        req.logout()
        res.redirect('/')
    })

app.get('/login',
    function (req, res) {
        res.redirect('/')
    })

// Page de connection

app.listen(8080, function () {
    console.log('server listening at port 8080')
})
