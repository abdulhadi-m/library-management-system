const express = require('express');

const app = express();

const PORT = 8081;

app.use(express.json());

app.get('/', (req,res)=>{
    res.status(200).send({
        message: "Home Page:-"
    })
})

// ExpressJs v4 way
// app.get('*',(req,res)=>{

// ExpressJs v5 way
app.get('(.*)',()=>{
    res.status(500).send({
        message: "Not Built Yet"
    })
})

app.listen(PORT,()=>{
    console.log(`Server is up and running on http://localhost:${PORT}`);
})