
// Local Modules

const auth = {
    login: () => {
        console.log("login successfull...!")
    },

    logout: () => {
        console.log("Logout successfull...!")
    },

    date: () => {
        let data = new Date()
        console.log(data)
    },

    details:{
        title:"admin",
        cred:"383737"
    }
}


module.exports = auth;

