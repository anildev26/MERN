# MERN Learning Topics
1. Create a server  
    * importing express, creating routes, listerning on port
2. Adding Middleware 
    * creating middleware assigning it to a routes ```req,res,next``` parameter
3. Connect Mongodb backend 
    * Create project and cluster, save username & password, configure network access, connect using drivers
4. Creating DOTENV file 
    * .env file for securing data ```dotenv.config({path: ".env file path"})```
    * Storing db connection mongoose info on different DB folder and requiring inside app.js
5. Making userSchema in models folder
    * Defining how data will be collected in front-end and what type of data will be stored in db via schema.
    * Creating schema using ```new mongoose.Schema``` and implementing the schema using ```mongoose.model```.
6. Making Express Router and Getting user data from postman
    * Creating new folder "routes" -> "auth.js" and defining express router. With Express router getting routes and intializing express route file in app.js ```app.use(require("./routes/auth"))```
    * Defining a post route in express router and displaying the fethcing user data using ```req.body``` & displaying to user window using ```res.json({ User1 : req.body })``` 
    * While sending the data to post url using postman, first write the header "Content-Type: application/json" and then write the json object in body tag.
7. 
    *
8. 
    *
9. 
    *
10. 
    *
11. 
    *

