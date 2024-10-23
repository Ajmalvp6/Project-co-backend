const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE).then(out=>{
    console.log("mongodb server connected");
    
}).catch(err=>{
    console.log(`mongodb server not connected ${err} `);
    
})
