const User = require('../database/models/User')

module.exports = (req, res) => {
    
    User.create(req.body)
    .then(() => res.redirect('/'))
    .catch((error) => {
        console.log(`ERROR: ${error}`)
        return res.redirect('/auth/register')
    })
}