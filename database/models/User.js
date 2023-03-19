const bcrypt = require('bcrypt')

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,

        required: true,

        unique: true
    },

    email: {
        type: String,

        // mongoose will make sure email is not null before store it into database
        required: true,

        // mongoose will make sure there is no duplicate in the database
        unique: true
    },

    password: {
        type: String,

        required: true
    }
})

// Execute password hashing process in the middleware "UserSchema.pre('save')" which will be executed before saving the user's info.
UserSchema.pre('save', function (next) {
    const user = this

    // bcrypt.hash(object that needs to be encrypted, number of encryption rounds)
    // the more rounds we encrypt, the more secure result we get, but slower the process
    // bcrypt.hash() function accepts a callback with two arguments: an error, and the resulting hash.
    bcrypt.hash(user.password, 10, (error, encrypted) => {

        if(error){
            return next(error)
        }
        
        user.password = encrypted

        // this funtion must be called in order to continue the process.
        next()
    })
})

module.exports = mongoose.model('User', UserSchema)