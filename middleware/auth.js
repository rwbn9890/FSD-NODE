const adminTbl = require("../models/adminTbl")

const auth = async (req, res, next) => {

 const user = req.session.user

    if(user)
    {  
        user = await adminTbl.findById(user.id)
        if(user)
        {
             req.currentUser = user
            return next()
        }else{
            return res.redirect("/")
        }
    }else{
        return res.redirect("/")
    }
}

module.exports = auth