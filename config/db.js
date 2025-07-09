const mongoose = require("mongoose")
    require('dotenv').config();
mongoose.connect(process.env.DB_URL)

const db = mongoose.connection

db.on("connected", (err)=>{
    if(err){
        console.log(err);
        return false
    }
    console.log("db is connected")
})

module.exports = db;