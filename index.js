const express = require("express")
const path = require("path")
const db = require("./config/db")
const cookieParser = require("cookie-parser")
const session = require("express-session")

const port = 4400;

const app = express();

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use("/", express.static(path.join(__dirname, "/public")))
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

app.use(session({
    name:"adminKey",
    secret:"adming-secrete-key",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000*60*60 }
}))

app.use("/", require("./routes/admin"))


app.listen(port, (err) => {
    if(err){
        console.log(err);
        return false
    }
    console.log("server is connected on port: " + port )
})