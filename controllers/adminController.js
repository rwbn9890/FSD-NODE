const adminTbl = require("../models/adminTbl")
const nodemailer = require("nodemailer");



const login = (req, res) => {
    return res.render("login")
}


const signIn = async (req, res) => {
    let currentUser = await adminTbl.findOne({email:req.body.email})
    if(currentUser){
        if(currentUser.password == req.body.password)
        {
            // res.cookie("admin", currentUser)
            req.session.user = currentUser;
            return res.redirect("/dashboard")
        }else{
            console.log("invalide Password")
            return res.redirect("/")
        }
    }else{
        console.log("invalide Email")
        return res.redirect("/")
    }
}

const logout = (req, res) => {
     res.clearCookie("admin");
    return res.redirect("/")
}



 const home = async (req, res) => {
            return res.render("home", {
                admin:req.currentUser
            })
}    


 const adminTable = async (req, res) => {
    try {
       let data = await adminTbl.find()
       return res.render("admin_table", {
        data,
        admin:req.currentUser
       })
    } catch (error) {
        console.log(err)
         return res.redirect("404")
    }
}



 const adminForm = (req, res) => {
    console.log(req.cookies)
    return res.render("admin_form",{
                admin:req.currentUser
    })
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
            admin:resp
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


 const viewProfile = async (req, res) => {

    if(req.query.adminId){
        try {
            let curUser = await adminTbl.findById(req.query.adminId)
            if(curUser){
                console.log(curUser)
                return res.render("viewProfile",{
                    admin:curUser
                })
            }
        } catch (error) {
            console.log(error)
        }
    }else{
        return res.redirect("/dashboard")
    }
 }


 const error = (req, res) => {
    return res.render("404")
}



 const changePassword =  (req, res) => {
    return res.render("changePassword", {
        admin:req.currentUser
    })
}


 const passwordChanged = async (req, res) => {
    console.log(req.body)

    if(req.body.oldpass == req.session.user.password){
        if(req.body.newpass == req.body.confirmpass){

         let curData = await adminTbl.findByIdAndUpdate(req.session.admin._id, {password:req.body.confirmpass})
         console.log(curData)
         if(curData){
            res.cookie("admin", curData)
            return res.redirect("/dashboard")
         }else{
            return res.redirect("/changePassword")
         }
        }else{
            return res.redirect("/changePassword")
        }
    }else {     
        return res.redirect("/changePassword")
    }
}


 const allUsers = async (req, res) => {

    let response = await adminTbl.find()
    return res.json(response)
}


const verifyEmail = async (req, res) => {
    try {
        if(req.body.email){
            let curUser = await adminTbl.findOne({email:req.body.email});
            if(curUser){
                
                let otp = Math.round(Math.random()*9999)

                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: "rwbn1.alishan.as@gmail.com",
                        pass: "acrrpsbukjktudlo",
                    },
                    });

                    const info = await transporter.sendMail({
                        from: '"Admin Panel" <rwbn1.alishan.as@gmail.com>',
                        to: req.body.email,
                        subject: "Lost Password OTP",
                        text: "otp", // plain‑text body
                        html: `OTP- <b>${otp}</b>`, // HTML body
                    });
                    if(info){
                        console.log("Email Sent")
                        res.cookie("otp", otp)
                        res.cookie("email", req.body.email)
                       return res.redirect("/verifyOtpPage")
                    }else{
                        return res.redirect("/")
                    }

            }else{
                return res.redirect("/")
            }
        }else{
            return res.redirect("/")
        }
    } catch (error) {
        console.log(error)
        return res.redirect("/")
    }
}


const verifyOtpPage = (req, res) => {
    return res.render("verifyOtpPage")
}

const verifyOtp =async (req, res) => {
    try {
        if(req.body.otp){
            if(req.cookies.otp == req.body.otp){
                return res.redirect("/resetPassword")
            }else{
                console.log("otp did not match");
                 return res.redirect("/verifyOtpPage")
            }
        }else{
            return res.redirect("/verifyOtpPage")
        }
    } catch (error) {
        
    }
}

const resetPasswordPage = (req, res)=>{
    return res.render("resetPassword")
}

const resetPassword = async (req, res)=>{
    
   if(req.body.newPassword && req.body.confirmPassword){
        if(req.body.newPassword == req.body.confirmPassword){
            try {
                let curUser = await adminTbl.findOne({email:req.cookies.email})
                if(curUser){
                   let changedUser = await adminTbl.findByIdAndUpdate(curUser.id, {password:req.body.confirmPassword})
                   if( changedUser){
                    return res.redirect("/")
                   }
                }else{
                    console.log("confirm User not Found");
                    return res.redirect("/")
                }
           
            } catch (error) {
                console.log(error)
            }
        }else{
            console.log("New and confirm password did not match")
            return res.redirect("/resetPassword")
        }
   }else{
    return res.redirect("/resetPassword")
   }
}

module.exports = {login, signIn,logout, home, adminTable, adminForm, insertAdmin, editAdmin, viewProfile, updateAdmin, error, allUsers, changePassword, passwordChanged, verifyEmail, verifyOtpPage, verifyOtp, resetPasswordPage, resetPassword }