module.exports = function (app, databaseInsert) {
    app.get('/register', function (req, res) {
        res.render('register')
    })

    app.post('/register',
        function (req, res) {
            databaseInsert.insertUser(req.body.username, req.body.email, req.body.password)
            res.redirect('/')
        })
}
