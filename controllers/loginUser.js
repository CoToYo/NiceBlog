const User = require('../database/models/User')

const bcrypt = require('bcrypt')
const express = require('express')

module.exports = async (req, res) => {
    const {email, password} = req.body

    try{
        // try to find the target user
        var user = await User.findOne({ email: email })
        if(user == null){
            throw "Can't find the user."
        }

    } catch (error){
        console.log(`ERROR: ${error}`)
        return res.redirect('/auth/login')
    }

    // compare password
    bcrypt.compare(password, user.password, (error, result) => {
        
        // if comparing result is true, it means the user type in the correct login info
        if(result){

            // save the user's id in the session
            req.session.userId = user._id

            res.redirect('/')
        }
        else{
            console.log("Wrong password.")
            return res.redirect('/auth/login')
        }
    })
}