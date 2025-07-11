const express = require("express")
const path = require("path")
const db = require("./config/db")
const cookieParser = require("cookie-parser")
const session = require("express-session")
    require('dotenv').config();
const passport = require("passport")
const localst = require("./middleware/pls")

var flash = require('connect-flash');

const port = process.env.PORT;

const app = express();

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())



app.use("/", express.static(path.join(__dirname, "/public")))
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))


app.use(session({
    name:"admin",
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60
    }
}))


app.use(passport.session())
app.use(passport.initialize())
app.use(passport.userAuth)
app.use(flash())
app.use("/", require("./routes/admin"))

app.listen(port, (err) => {
    if(err){
        console.log(err);
        return false
    }
    console.log("server is connected on port: " + port )
})