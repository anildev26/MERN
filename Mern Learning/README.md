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
7. Storing the User Data in the Online Database using Express & Mongoose
    * Inside Express router we used destructuring to resolve this step again and again ```req.body[name/email/pass]``` and structed all req.body statements with attributes ```const {name, email, phone, work, password, cpassword} = req.body;```
    * Cross-check if any there is no empty field submitted by user, if so then return client side error status code and json error message.
    * If all the input fields are correct then before entering the user data into database, its necessary to check if any user with same email is already present or not using ```User.findOne({email:email})``` this return promise ".then and .catch" & if sameEmail exist then return "Email already exist" otherwise enter the user entered data into DB
    * To enter data into database we need to create unique/new instance of our  userSchema on every new user entry (Db schema) ```const user = new User({name, email, phone, work, password, cpassword})```
    * Use ```user.save()``` to send the user entered values to db but this also returns promise so we can find if any entry made to database or not, if entry made then return in ```.then (user registered successfully)``` if data couldn't be added to db ```.catch (Failed to register)```
    * Finally add the last ".catch" promise of User.findOne (if that statement can not be executed with technical issue) then display an error message console/res.json
8. 
    *
9. 
    *
10. 
    *
11. 
    *

