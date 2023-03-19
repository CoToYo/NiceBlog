const User = require('../database/models/User')

module.exports = (req, res) => {
    
    User.create(req.body)
        .then(() => res.redirect('/'))
        .catch((error) => {

            const registrationError = Object.keys(error.errors).map(key => error.errors[key].message)

            // console.log(`ERROR: ${registrationError}`)

            // req.session.registrationError = registrationError

            // flash storage 'registrationError' value in session with a key also called 'registrationError'
            req.flash('registrationError', registrationError)

            req.flash('data', req.body)

            return res.redirect('/auth/register')
        })
}