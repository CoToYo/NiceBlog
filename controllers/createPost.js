module.exports = (req, res) => {
    
    // only if the userId is in the current user session, then the createPost page is visible
    if(req.session.userId) {
        return res.render("create", {
            errors: req.flash("registrationError"),
            lastInput: req.flash("lastInput")
        })
    }

    res.redirect('/auth/login')

}