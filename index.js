const express = require("express")
const path = require("path")


const port = 4400;

const app = express();


app.set("view engine", "ejs")

app.use(express.urlencoded())

app.use("/", express.static(path.join(__dirname, "/public")))

app.use("/", require("./routes/admin"))


app.listen(port, (err) => {
    if(err){
        console.log(err);
        return false
    }
    console.log("server is connected on port: " + port )
})