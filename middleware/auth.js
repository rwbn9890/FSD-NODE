const adminTbl = require("../models/adminTbl")

const auth = async (req, res, next) => {
 let cookie = req.cookies;
    if(cookie.admin)
    {
        let currentUser = await adminTbl.findOne({email:cookie.admin.email})
        if(currentUser)
        {
             req.currentUser = currentUser
            return next()
        }else{
            return res.redirect("/")
        }
    }else{
        return res.redirect("/")
    }
}

module.exports = auth