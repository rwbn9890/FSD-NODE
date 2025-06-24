const express = require("express")
const db = require("./config/db")
const adminTbl = require("./model/adminTbl")
const multer = require("multer")
const path =require("path")
const fs = require("fs")

const port = 4300;
const app = express();



app.set("view engine", "ejs")

app.use(express.urlencoded())

app.use("/uploads", express.static(path.join(__dirname, "uploads")))


const newImage  = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, "uploads/")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const images = multer({storage:newImage}).single("image")




app.post("/editData", images, (req, res)=>{
    const {id, name, email, phone, password} = req.body;

    // console.log(req.file)

    if(req.file)
    {
        const image = req.file.path
            adminTbl.findById(id).then((oldRecord)=>{
            fs.unlinkSync(oldRecord.image)
            })
            .catch((err)=>{
                console.log(err)
                return false
            })

            adminTbl.findByIdAndUpdate(id, {
                name,
                email,
                phone,
                password,
                image
            })
            .then((data)=>{
                    res.redirect('/')
                    return false
                })
                .catch((err)=>{
                    console.log(err)
                    return false
                }) 
    }
    else{
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
    }
  
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
            console.log(data)
            fs.unlinkSync(data.image)
                console.log("Record Deleted Successfully..!")
                return false
            })
            .catch((err)=>{
                console.log(err)
                return false
            })
    res.redirect("/")
})





app.post("/insertData", images , (req, res)=>{
    const {name, email, password, phone} = req.body

    let image = req.file.path;
    adminTbl.create({
        name, 
        email,
        phone,
        password,
        image
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