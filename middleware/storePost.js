module.exports = (req, res, next) => {
    console.log("validateCreatePostMiddleware has been called.")

    // if there is no files (e.g. images) or anyother necessary data in request from browser, stop the post creating proecess and return.
    if(!req.files || !req.body.username || !req.body.title || !req.body.content) {
        return res.redirect('/posts/new')
    }

    // this funtion must be called in order to continue the process.
    next()
}