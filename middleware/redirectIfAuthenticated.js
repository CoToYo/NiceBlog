const User = require('../database/models/User')


// this middleware is used to hide some unecessary pages for logined users
module.exports = (req, res, next) => {
    if(req.session.userId){
        return res.redirect('/')
    }

    next()
}