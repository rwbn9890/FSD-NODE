const express = require("express");

const routes = express.Router();
const multer = require("multer")
const path = require("path");
const adminTbl = require("../models/adminTbl")
const passport = require("passport")
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


routes.get("/", adminController.login)

routes.post("/login", passport.authenticate("local", {failureRedirect:'/'}),   adminController.signIn)

routes.get("/logout", adminController.logout)

routes.get("/dashboard",passport.isAuth, adminController.home)

routes.get("/users",passport.isAuth, adminController.allUsers)

routes.get("/admin_table",passport.isAuth, adminController.adminTable)

routes.get("/admin_form",passport.isAuth, adminController.adminForm)

routes.post("/insertAdmin", avatarImage, adminController.insertAdmin)

routes.get("/edit_admin", adminController.editAdmin)

routes.get("/viewProfile", adminController.viewProfile)

routes.post("/updateAdmin/:id",avatarImage, adminController.updateAdmin)

routes.get("/404", adminController.error)

routes.get("/changePassword", passport.isAuth, adminController.changePassword)

routes.post("/passwordChanged", adminController.passwordChanged)

routes.post("/verifyEmail", adminController.verifyEmail)

routes.get("/verifyOtpPage", adminController.verifyOtpPage)

routes.post("/verifyOtp", adminController.verifyOtp)

routes.get("/resetPassword", adminController.resetPasswordPage)

routes.post("/resetPassword", adminController.resetPassword)

module.exports = routes