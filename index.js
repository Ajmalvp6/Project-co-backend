require("dotenv").config()

// create server using express
const express = require("express")

const router = require("./Routes/Routes")



const project_server = express()

// connect with frontend

const cors = require("cors")

project_server.use(cors())
require("./db/connection")

// convert all incoming json data to js
project_server.use(express.json())
project_server.use(router)


// export upload folder to client app
project_server.use('/uploads',express.static('./uploads'))

// port set -lisen

const PORT =8001 || process.env.PORT

project_server.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
    
    
})

// resolve api request

project_server.get("/",(req,res)=>{
    res.send("request recieved successully")
})

// post request

// project_server.post("/user",(req,res)=>{
//     res.send("post request recieved")
// })