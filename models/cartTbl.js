const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
   qtn:{
    type:Number,
    require:true
   }
})

const cartTbl = mongoose.model("cart", cartSchema)

module.exports = cartTbl