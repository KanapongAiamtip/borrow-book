const passport = require('passport')

module.exports = function (req, res, next) {
    /*console.log('*** user data ***')
    console.log(res)*/
    passport.authenticate('user','jwt', function (err, user) {
        //if (err || !user) {
        if (err || !user) {
            res.status(403).send({
                error: 'you do not have access to this resource'
            })
        } else {
            req.user = user
            next()
        }
    })(req, res, next)
}