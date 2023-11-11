const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Home page from Express Router");
})

router.post("/register", (req, res) => {
        console.log(req.body);
        // res.send("You have successfully registered");
        res.json({ User1 : req.body });
})


module.exports = router