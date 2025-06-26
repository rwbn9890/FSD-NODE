
 const home = (req, res) => {
    return res.render("home")
}

 const adminTable = (req, res) => {
    return res.render("admin_table")
}

 const adminForm = (req, res) => {
    return res.render("admin_form")
}

 const insertAdmin = (req, res) => {

    console.log(req.body)
    console.log("data added")
   
}

module.exports = {home, adminTable, adminForm, insertAdmin}