const jwt=require('jsonwebtoken')

exports.jwtMiddleware=(req,res,next)=>{
    
   
    console.log("_______________JWT Middleware");
    


    try{ // verify

         // access token from req

        const token=req.headers['access_token'].split(" ")[1]

     const jwtResponse = jwt.verify(token,process.env.SECRET_KEY)

    //  access the payload and store
    req.payload=jwtResponse.userId
    
    // exit from middleware function
    next()
   
}
catch{
    res.status(401).json("authentication failed ! please login")
}



    
    
}