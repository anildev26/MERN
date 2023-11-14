const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
require("../db/conn");
const User = require("../models/userSchema");

router.get("/", (req, res) => {
  res.send("Home page from Express Router");
});

router.post("/register", async (req, res) => {
  // Object Destructuring and getting user data to access it more easily
  const { name, email, phone, work, password, cpassword } = req.body;

  // console.log(name);
  // console.log(password);
  // res.send("You have successfully registered");
  // res.json({ User1 : req.body });

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill all the information" });
  }

  // Putting all logical code in [try/catch block] any error in any phase occurs will be handled by catch here:
  try {
    const alreadyRegister = await User.findOne({ email: email }); // Handle a promise

    if (alreadyRegister) {
      return res.status(422).json({ error: "Email already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password does not match" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      //yaha pe horahi hai hashing middleware from models/userSchema
      const registerUser = await user.save(); // Handle a promise
      res.status(201).json({ message: "User registered successfully, go to login" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body; // object destructuring

    // Case 1: If both sign-in fields are empty and user clicks on submit
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill the data" });
    }

    // Case 2: It should be already registered Email and only if email entered and blank password and user clicks on submit then return error
    const userLogin = await User.findOne({ email: email });

    console.log(userLogin); // displays the whole document of matched email, if email not matched then return "NULL"

    if (userLogin) {
      // Case 3: Email found in db and user also entered the password then check for credentials if passwords matches then "Login Successfull" or else if password incorrect then "Invalid Credentials"
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (isMatch) {
        res.status(200).json({ message: "Login Successfull" });
      } else {
        res.status(400).json({ error: "Invalid Credentials" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
