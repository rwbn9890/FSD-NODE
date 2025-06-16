const express = require("express")
const path = require("path")
const db = require('./config/database')
const admin = require("./models/adminTbl")

let port = 9000;

const app = express();

app.set("view engine", "ejs")

app.use("/", express.static(path.join(__dirname, "/public")))


app.get("/", (req, res)=> {
    res.render('index')
})


app.listen(port, db, (err)=> {
    if(err)
    {
        console.log("server is not connected...!")
        return false;
    }
    console.log("server is  connected to port ", + port)
})