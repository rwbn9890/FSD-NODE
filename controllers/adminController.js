const adminTbl = require("../models/adminTbl")

 const home = (req, res) => {
    return res.render("home")
}



 const adminTable = async (req, res) => {
    try {
       let data = await adminTbl.find()
       return res.render("admin_table", {
        data,
       })
    } catch (error) {
        console.log(err)
         return res.redirect("404")
    }
}





 const adminForm = (req, res) => {
    return res.render("admin_form")
}







 const insertAdmin = async (req, res) => {
    console.log(req.body)
    console.log(req.file)

    if(req.file)
    {
        req.body.avatar = req.file.path
    }
    try {
        let data = await adminTbl.create(req.body)
            return res.redirect("/admin_form")
    } catch (error) {
        console.log(error)
        return res.redirect("404")
    }
}









 const editAdmin = async (req, res) => {

     let id = req.query.userId;
     if(req.query.userId)
     {
        let resp = await adminTbl.findById(id)
      
        return res.render("edit_admin",{
            editData:resp
         })
     }
     else{
        return res.redirect("404")
    }
  
 }




 const updateAdmin = async (req, res) => {

     let id = req.params.id;

     if(req.file){
        req.body.avatar = req.file.path
     }
     
     if(req.params.id)
     {
        if(req.body.avatar){
            let resp = await adminTbl.findByIdAndUpdate(id, req.body)
        }else{
            let avUp = await adminTbl.findById(id)
            req.body.avatar = avUp.avatar
            let resp = await adminTbl.findByIdAndUpdate(id, req.body)
        }
        return res.redirect("/admin_table")
     }
     else{
        return res.redirect("404")
    }
  
 }




 const error = (req, res) => {
    return res.render("404")
}



 const allUsers = async (req, res) => {

    let response = await adminTbl.find()
    return res.json(response)
}

module.exports = {home, adminTable, adminForm, insertAdmin, editAdmin, updateAdmin, error, allUsers}