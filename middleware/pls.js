
const passport = require("passport");
const LocalStrategy = require("passport-local");
const adminTbl = require("../models/adminTbl");


passport.use(new LocalStrategy( 
    {usernameField:email},
    async function(email, password, done){
        let adminRecord = await adminTbl.findOne({email:email})
        if(adminRecord){
            if(adminRecord.password == password){
                    return done(null, adminRecord)
            }else{
                return done(null, false)
            }
        }else{
            return done(null, false)
        }
}))

passport.serializeUser( function(user, done){
    if(user){
        return done(null, user.id)
    }else{
        return done(null, false)
    }
})

passport.deserializeUser(async function(id, done){
     let adminUser = await adminTbl.findById(id)
     if(adminUser){
        return done(null, adminUser)
     }else{
        return done(null, false)
     }
})