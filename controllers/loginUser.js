const User = require('../database/models/User')

const bcrypt = require('bcrypt')
const express = require('express')

module.exports = async (req, res) => {
    const {email, password} = req.body

    /**
     * Another code solution
     */
    // if(email.length == 0 || password.length == 0){
    //     const registrationError = "Please offer complete input!"
    //     // flash storage 'registrationError' value in session with a key also called 'registrationError'
    //     req.flash('registrationError', registrationError)
    //     // 
    //     req.flash('lastInput', req.body)

    //     return res.redirect('/auth/login')
    // }

    // var user = await User.findOne({emial: email})
    // .then((user) => {
    //     // compare password
    //     bcrypt.compare(password, user.password, (error, result) => {
    //         // if comparing result is true, it means the user type in the correct login info
    //         if(result){
    //             // save the user's id in the session
    //             req.session.userId = user._id
    //             res.redirect('/')
    //         }
    //         else{
    //             console.log("Wrong password.")
    //             return res.redirect('/auth/login')
    //         }
    //     })

    //     res.redirect('/auth/login')
    // })
    // .catch((error) => {
    //     console.log(error.message)
    // })

    try{
        if(email.length == 0 || password.length == 0){
            throw new TypeError("Missing input.")
        }

        // try to find the target user
        var user = await User.findOne({ email: email })
        if(user == null){
            throw new ReferenceError("Can't find the email.")
        }

        // compare password
        var bcryptResult = await bcrypt.compare(password, user.password)
        if(bcryptResult){
            // save the user's id in the session
            req.session.userId = user._id
        }
        else{
            throw new ReferenceError("Invalid password.")
        }

        return res.redirect('/')

    } catch (error){
        var registrationError = ""
        if(error instanceof TypeError && error.message == "Missing input."){
            registrationError = "Please offer complete input!"
        }
        else if(error instanceof ReferenceError && error.message == "Can't find the email."){
            registrationError = "Email not found."
        }
        else if(error instanceof ReferenceError && error.message == "Invalid password."){
            registrationError = "Invalid password."
        }

        // flash store 'registrationError' value in session with a key also called 'registrationError'
        req.flash('registrationError', registrationError)
        // flash store last user input
        req.flash('lastInput', req.body)

        return res.redirect('/auth/login')
    }
}