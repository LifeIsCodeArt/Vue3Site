const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
        articleName: {
            type: String,
            required: true
        },
        mainText: {
            type: String,
            required: true
        },
        mainPicture:{
            required: true,
            type: String
        },
        mainTheme:{
            type: String,
            required: true
        },
        commentSection:[
             {
                commentAuthor:{
                    type: String,
                    required: false,
                    unique: false
                },
                commentText:{
                    type: String,
                    required: false,
                    unique: false
                },
            }
        ],
        addons:[],
        testSection:{
            type: String
        },
        likeMeter:{
            type: Number,
            required: true,
            default: 0
        },
    },
    {
        timestamps: true
    }

)

const Product = mongoose.model("Product", productSchema)
module.exports = Product;
