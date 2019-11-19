module.exports = function (app) {
    app.get('/logout', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            req.logout()
            res.redirect('/')
        })

    app.get('/login',
        function (req, res) {
            res.redirect('/')
        })
}
