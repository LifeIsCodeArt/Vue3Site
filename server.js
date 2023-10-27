const express = require('express');
const mongoose = require('mongoose')
const Product = require('./models/productModel.js')
const User = require('./models/userModel.js')
const cors = require("cors");
const app = express();
app.use(cors())
app.use(express.json())

//routes

app.get('/', (req, res) =>{
    res.send('Helo NODE API')
})

app.get('/blog', (req, res) =>{
    res.send('Hello Blog my name is Artem')
})

app.get('/products', async(req,res) =>{
    try{
        const products = await Product.find({});
        res.status(200).json(products)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})
app.get('/users', async(req,res) =>{
    try{
        const users = await User.find({});
        res.status(200).json(users)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req,res) =>{
    try{
        const {id} = req.params
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})
app.get('/users/:id', async(req,res) =>{
    try{
        const {id} = req.params
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async (req, res) =>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch(error){
       console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.post('/products/:id/commentSection', async (req, res) => {
    try {
        const { id } = req.params
        const newComment = req.body
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` })
        }

        product.commentSection.push(newComment);
        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
app.post('/users', async (req, res) =>{
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})
//update product
app.put('/users/:id', async(req, res) =>{
    try{
        const {id} = req.params
        const user = await User.findByIdAndUpdate(id,req.body)
        //we cannot find any id in database
        if(!user){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedUsers = await User.findById(id)
        res.status(200).json(updatedUsers)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})
app.put('/products/:id', async(req, res) =>{
    try{
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id,req.body)
        //we cannot find any id in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})
mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://Admin:Liferun666@clusterapi.n3drpmb.mongodb.net/Cluster-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB ClusterAPI')
    app.listen(3000, ()=> {
        console.log('Node API app is running on port 3000')
    })
}).catch((error) =>{
    console.log(error)
})