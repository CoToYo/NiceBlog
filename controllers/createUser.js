// This controller will be called once user click in "Register" page.

module.exports = (req, res) => {
    // console.log(`registrationError: ${req.session.registrationError}`)
    console.log(req.flash('lastInput'))
    res.render('register', {
        
        // if user was redirected to this page because of the wrong input last time, errors info from last time can be temporarily accessed.
        // if it is the first time user visit this page, registrationError would be shown as "undifined", which is not a problem.
        errors: req.flash('registrationError'),
        // get last input
        lastInput: req.flash('lastInput') // it returns an array
    })
}