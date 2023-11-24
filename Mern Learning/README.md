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
7. Storing the User Data in the Online Database using Express & Mongoose | Promises Version
    * Inside Express router we used destructuring to resolve this step again and again ```req.body[name/email/pass]``` and structed all req.body statements with one line ```const {name, email, phone, work, password, cpassword} = req.body;```
    * Cross-check if any there is no empty field submitted by user, if so then return client side error status code and json error message.
    * If all the input fields are correct then before entering the user data into database, its necessary to check if any user with same email is already present or not using ```User.findOne({email:email})``` this return promise ".then and .catch" & if sameEmail exist then return "Email already exist" otherwise enter the user entered data into DB
    * To enter data into database we need to create unique/new instance of our  userSchema on every new user entry (Db schema) ```const user = new User({name, email, phone, work, password, cpassword})```
    * Use ```user.save()``` to send the user entered values to db but this also returns promise so we can find if any entry made to database or not, if entry made then return in ```.then (user registered successfully)``` if data couldn't be added to db ```.catch (Failed to register)```
    * Finally add the last ".catch" promise of User.findOne (if that statement can not be executed with technical issue) then display an error message console/res.json
    #### Promises Version
    ```javascript
            const express = require('express');
            const router = express.Router();

            require("../db/conn")
            const User = require("../models/userSchema")

            router.get("/", (req, res) => {
                res.send("Home page from Express Router");
            })
            
            router.post("/register", (req, res) => {
            // Object Destructuring user data-json to access it more easily
            const {name, email, phone, work, password, cpassword} = req.body;

                // console.log(req.body.name); // before destructuring
                // console.log(password); // After destructuring

                // res.send("You have successfully registered");
                // res.json({ User1 : req.body });

                // if user keeps any empty field and submit a form then return err from server
                if(!name || !email || !phone || !work || !password || !cpassword){
                    return res.status(422).json({error: "Please fill all the information"}) 
                }

                User.findOne({email:email}) // returns a promise
                .then((userExist) => {
                    if(userExist) {
                        return res.status(422).json({error: "Email already exist"})
                    }
                    //User : which is db designed models/user, jiska instance create krke har ek user ka data add hoga
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
    ```
8. Post Registration Data To MongoDB Atlas DB with Express & Mongoose | Async-Await Version
    * Easiest and Recommended Approach
    #### Async-Await Version
    ```javascript
            const express = require('express');
            const router = express.Router();

            require("../db/conn")
            const User = require("../models/userSchema")

            router.get("/", (req, res) => {
                res.send("Home page from Express Router");
            })

            router.post("/register", async(req, res) => {
            // Object Destructuring user data-json to access it more easily
            const {name, email, phone, work, password, cpassword} = req.body;

                // console.log(req.body.name); // before destructuring
                // console.log(password); // After destructuring
                
                // res.send("You have successfully registered");
                // res.json({ User1 : req.body });

                // if user keeps any empty field and submit a form then return err from server
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
                } catch(err) {
                    console.log(err);
                }
        })
        
        module.exports = router
    ```
9. Create a Login Route
    * Creating similar login route via post method and async-await
    * Validating 3 things in the login form:
        1. If any blank email/password submitted then return an error.
        2. If entered email does not exist then return an error (invalid credentials).
        3. Passwords should be matched.
10. Password Hashing in registeration using Bcrypt.JS
    * Install bcrypt js into server directory
    * When we are creating the instance of schema User from models inside register routes and inside the instance fetching all the details of the form fields filled by the user.
    #### Route : /register
    ```javascript 
        const user = new User({name, email, phone, work, password, cpassword}) // instance of schema user to fetch the form details 
        // [ Before sending the data to get saved on db we need to get the password & cPassword and hash them --> i.e hashing them in "pre" ('save') mode ]      
        const registerUser = await user.save() // Handle a promise
    ```
    * To handle the 'pre' mode we will write the hashing middleware inside ```userSchema``` before exporting and adding data into db mongoose model.
    * Over here .pre method returns a promise and inside the method we will be need of "this" operator and this operator works differently in arrow function or simple function we will use normal function and async to handle the promise.
    * We don't wanna run this hashing code everytime user edits any field in form, we will only run this when user modifies 'password' field.
    #### Hashing code
    ```javascript 
            userSchema.pre("save", async function(next){
            //console.log("hi from userSchema middleware"); [For cross-checking that our method is getting called or not]
            if(this.isModified('password')){
                this.password = await bcrypt.hash(this.password, 12)
                this.cpassword = await bcrypt.hash(this.cpassword, 12)
            }
            next();
        })
    ```
    * Whenever password field is modified by user, form password and confirm password will get hashed by using inbuilt ```bcrypt.hash(password-to-be-hashed, salt-Number-to-be-added)``` and the hash password is again stored to the same password field.
    * Note :- Before saving the registeration form of any ever this 'pre' function will always be called because an argument 'save' is given to it which means before/pre saving (save) the data always runs this method. That's the reason wherever it will be called it will look only changes made in 'password' field everything else is ignored. 
11. Check Hash Password and Email & Implementing Login Functionality
    * Already when we're checking if email exist or not, overthere the db returns the whole document of matched email from that stored returned document we will check if current entered password of user matches the database hashed password or not.
    * User enters the normal string password and our users database contains the hashed password of all the registered users to compare these both just like 'bcrypt.hash' convert the string password to hash, bcrypt.js also has a method ```bcrypt.compare(user-current-entered-password, returned-database-document-variableName.password)``` and this will compare the currently entered user password in sign-in page with already stored database password.
12. Another day passed did nothing
13. One more day wasted , +1 more wasted ,Sher  ne aj fir kuch nahi kia, fir ek din mere lofe me koi changes nahi hue

hi

