const mongoose = require('mongoose');
const express = require("express");
const app = express();

const DB = "mongodb+srv://mern2023:92209986@mern2023.jngmyot.mongodb.net/practise?retryWrites=true&w=majority"

mongoose.connect(DB).then(()=>{
    console.log(`Connection Successfull`);
}).catch((err) => {
    console.log(`Connection failed`);
});

const middleware = (req, res, next) =>{
    console.log("middleware is running");
    next();
}   


app.get("/", (req, res) => {
    res.status(200).send("Welcome to Home Page")
})

app.get("/about",middleware, (req, res) => {
    console.log("About me page is loaded");
    res.status(200).send("This is about page")
})

app.get("/contact", (req, res) => {
    res.status(200).send("Your're in Contact Page")
})

app.get("/login", (req, res) => {
    res.status(200).send("Please Login your account")
})

app.get("/register", (req, res) => {
    res.status(200).send("Register yourself first")
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port:  ${PORT}`);
})
