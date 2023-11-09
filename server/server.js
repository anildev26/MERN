//express ko bula ke ek variable throw run krdia
const express = require("express");
const app = express();

//ab "app" ke throw ham various cheje kr sakte, Let's start creating routes for our server

// Home page
app.get("/", (req, res) => {
    res.status(200).send("Hello, Don't forget to follow me on github.")
});

// Register page

app.get("/register", (req, res) =>{
    res.status(200).send("You're currently on registeration page.")
})

// ab hamne port uppar krdia define ab server ko chalu krna padega ek port pe (listen)
const PORT = "5000";
app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})

// To run our server file for now in basic mode - use "npm run start"