const express = require('express');
const router = express.Router();

require("../db/conn")
const User = require("../models/userSchema")

router.get("/", (req, res) => {
    res.send("Home page from Express Router");
})

router.post("/register", async(req, res) => {
    // Destructuring user data json to access it more easily
    const {name, email, phone, work, password, cpassword} = req.body;

        // console.log(name);
        // console.log(password);
        // res.send("You have successfully registered");
        // res.json({ User1 : req.body });

        if(!name || !email || !phone || !work || !password || !cpassword){
            return res.status(422).json({error: "Please fill all the information"})
        }

        // Putting all logical code in [try/catch block] any error in any phase occurs will be handled by catch here:
        try {

            const alreadyRegister = await User.findOne({email:email});  // Handle a promise
            
            if(alreadyRegister) {
                return res.status(422).json({error: "Email already exist"})
            }  

            const user = new User({name, email, phone, work, password, cpassword})
            const registerUser = await user.save() // Handle a promise

            res.status(201).json({message: "User registered successfully, go to login"})

            
        } catch(err){
            console.log(err);
        }
})

router.post("/signin", async (req, res) => {
    const {email, password} = req.body;

    // res.json({ "message": "Success" })

    if (!email || !password){
        return res.status(422).json({error: "Invalid Credentials"})
    }

    try {
        
    } catch (err) {
        console.log(err);
    }
})
module.exports = router