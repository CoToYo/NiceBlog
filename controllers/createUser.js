module.exports = (req, res) => {
    console.log(`registrationError: ${req.session.registrationError}`)
    
    res.render('register', {
        
        errors: req.flash('registrationError'),

        // save last valid input from user
        data: req.flash('data') // it returns an array
    })
}