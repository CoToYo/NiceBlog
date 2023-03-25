module.exports = (req, res) => {

    // clean user session
    req.session.destroy(() => {
        res.redirect('/')
    })

    

}