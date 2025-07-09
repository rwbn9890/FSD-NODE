const passport = require("passport")

const localStrategy = require("passport-local")
const adminTbl = require("../models/adminTbl")

passport.use(new localStrategy(
    {usernameField:'email'}, // user the single quote
   async function(email, password, done){
        let curRecord = await adminTbl.findOne({email:email})
    
        if(!curRecord){
            return done(null, false)
        }
        if(curRecord.password !== password){
            return done(null, false)
        }
        return done(null, curRecord)
}))

passport.serializeUser(function(user, done){
    if(!user){
        return done(null, false)
    }
    return done(null, user.id)
})

passport.deserializeUser( async function(id, done){
    let curUser = await adminTbl.findById(id);
    if(!curUser){
        return done(null, false)
    }
    return done(null, curUser)
})

passport.isAuth = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next()
    }else{
        return res.redirect('/')
    }
}

passport.userAuth = (req, res, next)=>{
        res.locals.admin = req.user;
        next()
}


module.exports = passport