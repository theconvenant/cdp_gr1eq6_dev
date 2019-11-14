const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const databaseSelect = require('./controller/database_select')
const databaseInsert = require('./controller/database_insert')
const authenticate = require('./models/authenticate')

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

app.get('/index', function (req, res) {
    res.render('index')
})

app.post('/index', function (req, res) {
    res.render('index')
})

app.get('/summary', function (req, res) {
    res.render('summary')
})

app.get('/issues', function (req, res) {
    res.render('issues')
})

app.get('/tasks', function (req, res) {
    res.render('tasks')
})

app.get('/tests', function (req, res) {
    res.render('tests')
})

app.get('/sprints', function (req, res) {
    res.render('sprints')
})

app.get('/documentation', function (req, res) {
    res.render('documentation')
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

app.get('/logout',
    function (req, res) {
        req.logout()
        res.redirect('/')
    })

// Page de connection

app.listen(8080, function () {
    console.log('server listening at port 8080')
})
