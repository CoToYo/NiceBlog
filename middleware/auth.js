const User = require('../database/models/User')

module.exports = (req, res, next) => {
    /**
     * 1. fetch user from database
     * 2. verify user
     * 2.1 if user is valid, permit request
     * 2.2 else redirect
     */

    User.findById(req.session.userId)
        .then((result) => {
            if(!result){
                throw "User not found."
            }

            next()
        })
        .catch((error) => {
            console.log(error)
            return res.redirect('/')
        })
}