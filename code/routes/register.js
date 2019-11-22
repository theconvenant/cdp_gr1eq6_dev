const userDb = require('../db_controller/user_db')

module.exports = function (app) {
    app.get('/register', function (req, res) {
        res.render('register')
    })

    app.post('/register',
        function (req, res) {
            userDb.insertUser(req.body.username, req.body.email, req.body.password)
            res.redirect('/')
        })
}
