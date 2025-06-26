const { resolveInclude } = require("ejs");
const dataTbl = require("../models/adminTbl")


const insertData =  (req, res)=>{
    const {title, price, category} = req.body;

    dataTbl.create({
        title, 
        price, 
        category
    })
    .then((data)=>{
        console.log("data inserted succesffully...!")
    })
    .catch((err)=>{
        console.log(err)
    })
    
    res.redirect("/")
}


const index = (req, res) => {
 dataTbl.find({})
    .then((data)=>{
         return res.render("home", {
            data,
            })
    })
    .catch((err)=>{
        console.log(err)  
    })


   
}

const about = (req, res) => {
    return res.render("about")
}

const contact = (req, res) => {
    return res.render("contact")
}

module.exports = {insertData, index, about, contact}