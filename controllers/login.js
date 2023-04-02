module.exports = (req, res) => {
    return res.render('login', {
        errors: req.flash('registrationError'),
        
        lastInput: req.flash('lastInput')
    })
}