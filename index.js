const express = require("express")

const app = express();


// MVC - MODAL VIEW CONTROL 

const port = 8000;

let data = [
    {
        id: 1,
        name: "Manthan",
        email: "manthan@gmail.com",
        password:"Manthan@123"
    },
    {
        id: 2,
        name: "RAjvi",
        email: "rajvi@gmail.com",
        password:"RAjvi@123"
    },
    {
        id: 3,
        name: "Mujjammil",
        email: "mujjammil@gmail.com",
        password:"Mujjammil@123"
    },
]

let alert = {}

app.use(express.urlencoded())

app.set("view engine",  "ejs");


const middleware = (req, res, next) => {
    // console.log("hellow")
    console.log(req.body)
    if(req.body.password != '')
        {
         next()
        }
        else{
           alert.message = "password did not added...!"
           res.redirect("/")
        }
    
}

app.post("/updateData", (req, res)=>{
        console.log(req.body)

        data = data.map((ele) => {
            if(ele.id == req.body.id)
            {
                ele.name = req.body.name,
                ele.email = req.body.email,
                ele.password = req.body.password
            }
            return ele;
        })
        return res.redirect("/")
})


app.get("/edit", (req, res)=>{
    let user = data.find((ele) => ele.id == req.query.id )
    res.render("update", {
        user,
    })
})

// app.get("/edit", (req, res)=>{

// })

app.get("/delete", (req, res) =>{
    let userId = req.query.id;
        data = data.filter((ele) => ele.id != userId)
        res.redirect('/')
})

app.post('/insert', middleware, (req, res)=>{
    data.push(req.body)
    res.redirect('/')
})


app.get('/', (req, res)=>{
    res.render("form", {
        students : data,
        alert: alert
    })    
})    


app.use(middleware)


app.listen(port, (err)=>{
    if(err)
    {
        console.log("server is not connected...!")
        return false;
    }
    console.log("connected to the port " + port)
})