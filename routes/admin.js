const express = require("express");

const routes = express.Router();
const multer = require("multer")
const path = require("path")


const adminTbl = require("../models/adminTbl")

routes.use(express.urlencoded())



let uploadAvatar = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "uploads/")
    },
    filename:(req, file,cb) => {
        cb(null, Date.now()+"_"+file.originalname)
    }
})

 let avatarImage = multer({storage:uploadAvatar}).single("avatar")


const adminController = require("../controllers/adminController")

routes.get("/", adminController.home)

routes.get("/users", adminController.allUsers)

routes.get("/admin_table", adminController.adminTable)

routes.get("/admin_form", adminController.adminForm)

routes.post("/insertAdmin", avatarImage, adminController.insertAdmin)

routes.get("/edit_admin", adminController.editAdmin)

routes.post("/updateAdmin/:id",avatarImage, adminController.updateAdmin)

routes.get("/404", adminController.error)

module.exports = routes