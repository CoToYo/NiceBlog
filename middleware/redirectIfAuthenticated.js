const User = require('../database/models/User')

// this middleware can check if the current user is authenticated
// it can also help us hide some unecessary pages for logined users
module.exports = (req, res, next) => {
    if(req.session.userId){
        return res.redirect('/')
    }

    next()
}