const express = require('express')
const bodyParser = require('body-parser')
// const ejs = require('ejs')
const path = require('path')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '.', '/views'))
app.use(express.static(path.join(__dirname, '.', 'views')))

app.get('/', function (req, res) {
    res.render('index')
})

// Page de connection

app.listen(8080, function () {
    console.log('server listening at port 8080')
})
