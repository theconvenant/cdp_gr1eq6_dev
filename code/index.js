const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 8080
const projectDb = require('./db_controller/project_db')
const userDb = require('./db_controller/user_db')

const authenticate = require('./routes/authenticate')

app.use(require('morgan')('combined'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require('express-session')({ secret: 'Secret key', resave: false, saveUninitialized: false }))

app.use(authenticate.passport.initialize())
app.use(authenticate.passport.session())

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '.', '/views'))
app.use(express.static(path.join(__dirname, '.', 'views')))

// import des routes
require('./routes/projects')(app)
require('./routes/register')(app)
require('./routes/login')(app)

const issues = new (require('./routes/issues'))(app)
const projectManagement = new (require('./routes/projectManagement'))(app)
const documentation = new (require('./routes/documentation'))(app)
const releases = new (require('./routes/releases'))(app)
const sprints = new (require('./routes/sprints'))(app)
const tests = new (require('./routes/tests'))(app)
const tasks = new (require('./routes/tasks'))(app)
const summary = new (require('./routes/summary'))(app)

var userName = ''

app.get('/', function (req, res) {
    res.render('index')
})

app.post('/',
    authenticate.passport.authenticate('local', { failureRedirect: '/' }),
    function (req, res) {
        userName = req.body.username
        res.redirect('/projects')
    })

app.post('/projectRedirect',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        const id = req.body.idProject
        projectDb.findProjectById(id).then(function (project) {
            const name = project[0]._project_name
            issues.setProjectId(id, name)
            projectManagement.setProjectId(id, name, project[0]._owner_name)
            documentation.setProjectId(id, name)
            releases.setProjectId(id, name)
            sprints.setProjectId(id, name)
            tests.setProjectId(id, name)
            tasks.setProjectId(id, name)
            summary.setProjectId(id, name)
            res.redirect('/summary')
        })
    })

app.get('/deleteAccount',
    function (req, res) {
        req.logOut()
        userDb.deleteAccount(userName)
        res.redirect('/')
    })

function redirectUnmatched (req, res) {
    res.redirect('/projects')
}

app.use(redirectUnmatched)

app.listen(port, function () {
    console.log('server listening at port 8080')
})
