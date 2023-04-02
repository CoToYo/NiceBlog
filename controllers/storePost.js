const Post = require('../database/models/Post')

const path = require('path') 

const cloudinary = require('cloudinary')

const fs = require('fs')

module.exports = async (req, res) => {
    try{
        if(req.body.title.length == 0){
            throw new TypeError("Missing Title.")
        }
        else if(req.body.content.length == 0){
            throw new TypeError("Missing Content.")
        }
        else if(!req.files){
            throw new TypeError("Missing Background Image.")
        }
        // else if(req.files.s)

        const { image } = req.files
        const uploadPath = path.resolve(__dirname, '..', 'public/posts_img', image.name)

        // image.mv(target_path), it moves image to tartget_path
        await image.mv(uploadPath)

        const result = await cloudinary.v2.uploader.upload(uploadPath, {
            limits: { fileSize: 5000000 } // set maximum file size to 5MB
        }).catch((error) => {
            throw new TypeError("Image is Too Big.")
        })
        // store data
        await Post.create({
            ...req.body,
            
            image: result.secure_url,
            // bind the user with this post
            author: req.session.userId

        })

        return res.redirect('/')

    } catch(error){
        var registrationError = ""
        if(error instanceof TypeError && error.message == "Missing Title."){
            registrationError = "Please input \"Title\"."
        }
        else if(error instanceof TypeError && error.message == "Missing Content."){
            registrationError = "Please input \"Content\"."
        }
        else if(error instanceof TypeError && error.message == "Missing Background Image."){
            registrationError = "Please choose a background image to upload."
        }
        else if(error instanceof TypeError && error.message == "Image is Too Big."){
            registrationError = "Can not upload image larger than 5MB."
        }
        else{
            console.log(`Error: ${error}`)
        }

        // flash store 'registrationError' value in session with a key also called 'registrationError'
        req.flash('registrationError', registrationError)
        // flash store last user input
        req.flash('lastInput', req.body)

        return res.redirect('/posts/new')
    }
    
}