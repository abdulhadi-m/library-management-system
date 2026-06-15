const express = require('express');
const dotenv = require('dotenv')

// const {users}= require("./data/users.json")
// const {books}= require("./data/books.json")

const {userModel, bookModel} = require('./models/index')
// const {userModel, bookModel} = require('../models/')


// import db connection file
const DbConnection = require('./databaseConnection')

// Importing the routers
const usersRouter= require('./routes/users') 
const booksRouter= require('./routes/books') 

dotenv.config();

const app = express();

DbConnection();

const PORT = 8081;

app.use(express.json());

app.get('/', (req,res)=>{
    res.status(200).send({
        message: "Home Page:-"
    })
})


app.use('/users', usersRouter)
app.use('/books', booksRouter)



// ExpressJs v4 way
// app.get('*',(req,res)=>{

// ExpressJs v5 way

// app.get('(.*)',()=>{
//     res.status(500).send({
//         message: "Not Built Yet"
//     })
// })

app.listen(PORT,()=>{
    console.log(`Server is up and running on http://localhost:${PORT}`);
})