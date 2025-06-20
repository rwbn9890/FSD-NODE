const express = require("express")
const db = require("./config/db")
const adminTbl = require("./model/adminTbl")

const port = 4300;
const app = express();



app.set("view engine", "ejs")

app.use(express.urlencoded())

app.post("/editData", (req, res)=>{
    const {id, name, email, phone, password} = req.body;

    adminTbl.findByIdAndUpdate(id, {
        name,
        email,
        phone,
        password
    })
       .then((data)=>{
            res.redirect('/')
            return false
        })
        .catch((err)=>{
            console.log(err)
            return false
        })
})






app.get("/edit", (req,res)=>{
    let id = req.query.id;
    adminTbl.findById(id)
      .then((data)=>{
            res.render("edit", {
                data,
            })
            return false
        })
        .catch((err)=>{
            console.log(err)
            return false
        })
})





app.get('/delete/:id', (req,res)=>{
    let id = req.params.id;
        adminTbl.findByIdAndDelete(id)
        .then((data)=>{
                console.log("Record Deleted Successfully..!")
                return false
            })
            .catch((err)=>{
                console.log(err)
                return false
            })
    res.redirect("/")
})





app.post("/insertData", (req, res)=>{
    const {name, email, password, phone} = req.body
    adminTbl.create({
        name, 
        email,
        phone,
        password
    })
    .then((data)=>{
        console.log("Data inserted Successfully..!")
        return false
    })
    .catch((err)=>{
        console.log(err)
        return false
    })
    res.redirect('/')
})






app.get("/", (req, res)=>{

        adminTbl.find()
          .then((data)=>{
                  res.render('index',{
                    data,
                  })
                return false
            })
            .catch((err)=>{
                console.log(err)
                return false
            })
})


app.listen(port, (err)=>{
    if(err)
    {
        console.log(err)
        return false
    }
    console.log("server is connected to port "+ port)
})