const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    category:{
        type:String,
        require:true
    },
})

const dataTbl = mongoose.model("data", adminSchema)

module.exports = dataTbl