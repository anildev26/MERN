const express = require('express');
const router = express.Router();

require("../db/conn")
const User = require("../models/userSchema")

router.get("/", (req, res) => {
    res.send("Home page from Express Router");
})

router.post("/register", (req, res) => {
    // Destruction user data json to access it more easily
    const {name, email, phone, work, password, cpassword} = req.body;
        // console.log(name);
        // console.log(password);
        // res.send("You have successfully registered");
        // res.json({ User1 : req.body });
        if(!name || !email || !phone || !work || !password || !cpassword){
            return res.status(422).json({error: "Please fill all the information"})
        }

        User.findOne({email:email}) // returns a promise
        .then((userExist) => {
            if(userExist) {
                return res.status(422).json({error: "Email already exist"})
            }
            //User : which is db model user uska instance create krke use add krna hoga
            const user = new User({name, email, phone, work, password, cpassword})
            user.save() // returns a promise
            .then(()=>{
                res.status(201).json({message: "User registered successfully, go to login"})
            }).catch((err)=>{
                res.status(500).json({err: "Failed to register user"})
            })
        }).catch((err)=>{ console.log(err); })
})


module.exports = router