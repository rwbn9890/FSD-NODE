const express = require("express")
const db = require("./config/db")
const adminTbl = require("./model/admitTbl")

const port = 3300;

const app = express();

app.set("view engine", "ejs")

app.use(express.urlencoded())

let edit = {
    id:""
}

app.get("/edit", (req, res)=>{
    let id = req.query.id;
    adminTbl.findById(id)
     .then((sing)=>{
        edit = sing;
        res.redirect("/")
        return false
    })
    .catch((err)=>{
        console.log(err)
        return false;
    })
    
    console.log(edit)

    
})


app.get("/delete/:id", (req, res)=>{
    // let id = req.query.id
    let id = req.params.id
    adminTbl.findByIdAndDelete(id)
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
    let editId = req.body.id;

    const {name, email, phone, password,gender,skills} = req.body

    if(editId)
    {
        adminTbl.findByIdAndUpdate(editId, {
            name: name,
            email: email,
            phone:phone,
            gender:gender,
            skills:skills,
            password:password
        })
        .then((data)=>{
            edit={}
            console.log("record edited successfully")
            console.log(data)
            return res.redirect('/')
        }).catch((err)=>{
            console.log(err);
            return false;
        })

    } else {
        adminTbl.create({
            name,
            email,
            phone,
            gender,
            skills,
            password
        })
        .then((oneRecord)=>{
            console.log("data inserted successfully...!")
            res.redirect('/')
            return false;
        })
        .catch((err)=>{
            console.log(err)
            return false;
        })
    }

})

app.get("/", (req, res)=>{

    adminTbl.find().then((allData)=>{
    //     console.log(allData)
       return res.render("index",{
        data:allData, 
        editData : edit
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