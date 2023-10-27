const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
        name: {
            type: String,
            required: [true, "Please enter the user name"]
        },

        password: {
            type: String,
            required: true
        },
        email: {
            type:String,
            required: true
        }
    },
    {
        timestamps: true
    }

)

const User = mongoose.model("User", userSchema)
module.exports = User;