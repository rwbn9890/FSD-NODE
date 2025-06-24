const express = require("express")

const app = express();

const port = 8500;

app.use(express.urlencoded())

app.set("view engine", "ejs")

app.use("/", require("./routes"))


app.listen(port, (err) => {
    if(err){
        console.log(err)
        return false;
    }
    console.log("server is connected to port " + port)
})