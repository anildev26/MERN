const mongoose = require('mongoose');
const DB = process.env.DB;

mongoose.connect(DB).then(()=>{
    console.log(`Connection Successfull`);
}).catch((err) => {
    console.log(`Connection failed`);
});