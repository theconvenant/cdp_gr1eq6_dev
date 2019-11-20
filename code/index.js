const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const databaseSelect = require('./controller/database_select')
const databaseInsert = require('./controller/database_insert')
const databaseDelete = require('./controller/database_delete')
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

// import des routes
require('./models/projects')(app, databaseInsert, databaseSelect)
require('./models/register')(app, databaseInsert)
require('./models/login')(app)

const issues = new (require('./models/issues'))(app, databaseSelect, databaseInsert, databaseDelete)
const projectManagement = new (require('./models/projectManagement'))(app)
const documentation = new (require('./models/documentation'))(app)
const releases = new (require('./models/releases'))(app)
const sprints = new (require('./models/sprints'))(app)
const tests = new (require('./models/tests'))(app)
const tasks = new (require('./models/tasks'))(app, databaseInsert, databaseSelect, databaseDelete)
const summary = new (require('./models/summary'))(app)

app.get('/', function (req, res) {
    res.render('index')
})

app.post('/',
    authenticate.passport.authenticate('local', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/projects')
    })

app.post('/projectRedirect',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        const id = req.body.idProject
        databaseSelect.findProjectById(id).then(function (project) {
            const name = project[0]._project_name
            issues.setProjectId(id, name)
            projectManagement.setProjectId(id, name)
            documentation.setProjectId(id, name)
            releases.setProjectId(id, name)
            sprints.setProjectId(id, name)
            tests.setProjectId(id, name)
            tasks.setProjectId(id, name)
            summary.setProjectId(id, name)
            res.redirect('/summary')
        })
    })

app.listen(8080, function () {
    console.log('server listening at port 8080')
})
