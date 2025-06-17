const express = require("express")
const db = require("./config/db")
const adminTbl = require("./model/admitTbl")

const port = 3300;

const app = express();

app.set("view engine", "ejs")

app.use(express.urlencoded())


app.get("/delete/:id", (req, res)=>{
    // let id = req.query.id
    let id = req.params.id
    adminTbl. findByIdAndDelete(id)
     .then((data)=>{
        console.log("data Deleted successfully...!")
        res.redirect('/')
        return false;
    })
    .catch((err)=>{
        console.log(err)
        return false;
    })
})

app.post("/insertData", (req, res)=>{
    console.log(req.body)

    const {name, email, phone, password} = req.body

    adminTbl.create({
        name,
        email,
        phone,
        password
    })
    .then((data)=>{
        console.log("data inserted successfully...!")
        res.redirect('/')
        return false;
    })
    .catch((err)=>{
        console.log(err)
        return false;
    })

})

app.get("/", (req, res)=>{

    adminTbl.find().then((allData)=>{
    //     console.log(allData)
       return res.render("index",{
        data:allData
       })
        
    })
    .catch((err)=>{
        console.log(err)
        return false;
    })

})

app.listen(port, (err)=>{
    if(err){
        console.log(err)
        return false;
    }
    console.log("server  is connected to " + port)
})