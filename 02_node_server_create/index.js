const http = require("http");
const fs = require("fs")

const port = 7000;

const handleRequest = (req, res) => {

// console.log(req.url)
let filename = ''

switch(req.url)
{
    case '/': filename = './index.html' 
    break;
    case '/contact': filename = './contact.html'
    break;
    case '/about' : filename = './about.html'
    break;
    case '/data/1234' :
    filename = './data.js'
    break;
    default : filename = './error.js'
}

    fs.readFile(filename,(err, result)=>{
        res.end(result);
    })

}

const server = http.createServer(handleRequest)

server.listen(port, (err)=>{
    if(err)
    {
        console.log("server is not Running...!")
        return false;
    }
    console.log("server is running on port: " + port)
})