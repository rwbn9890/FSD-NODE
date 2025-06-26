const cartTbl = require("../models/cartTbl")


const cart = (req, res) => {
    return res.render("cart")
}


const addCart = (req, res) => {
   const {title, price, qtn} = req.body
   cartTbl.create({
    title, 
    price, 
    qtn
   })
    .then((data)=>{
        console.log("cart inserted succesffully...!")
    })
    .catch((err)=>{
        console.log(err)
    })
    return res.redirect("/cart")
}
module.exports = {cart, addCart}