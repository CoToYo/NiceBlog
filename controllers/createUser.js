module.exports = (req, res) => {
    console.log(`ERROR: ${req.session.registrationError}`)
    res.render('register', {
        // errors: req.session.registrationError
        
        errors: req.flash('registrationError'),

        data: req.flash('data')[0] // it returns an array
    })
}