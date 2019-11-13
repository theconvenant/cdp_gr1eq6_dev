const express = require('express')
const bodyParser = require('body-parser')
// const ejs = require('ejs')
const path = require('path')
const app = express()

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

app.get('/issues', function (req, res) {
    res.render('issues')
})

app.post('/',
    authenticate.passport.authenticate('local', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/projects')
    })

app.get('/projects',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.render('projects', { user: req.user })
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
