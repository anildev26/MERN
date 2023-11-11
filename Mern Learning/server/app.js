const dotenv = require('dotenv')
dotenv.config({path: "./config.env"});

const express = require("express");
const app = express();
require("./db/conn")
const PORT = process.env.PORT;


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

app.listen(PORT, () => {
    console.log(`Server is running on port:  ${PORT}`);
})
