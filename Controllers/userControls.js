const  jwt  = require("jsonwebtoken");
const users = require("../Models/userModel");



exports.register = async (req, res) => {
  // fetch data from req body

  // var username=req.body.username
  // var email=req.body.email
  // var password=req.body.password

  const { username, email, password } = req.body;

  // check user exist in collection {email (key in model): email(fethed data fom api)}
  try {
    const existingUser = await users.findOne({ email });

    // if existing user is an object- only if the user present in collection

    if (existingUser) {
      res.status(401).json("already  regitered  ! ..please login");
    }

    // user not exist then existingUser content will be null
    else {
      // create an object for user
      const newUser = new users({
        username,
        email,
        password,
        profile: "",
        linkedIn: "",
        gitHub: "",
      });
      // save created object in mongodb
      await newUser.save();
      res.status(201).json("account created successfully");
    }
  } catch {
    res.send(400).json("register api failed");
  }
};





exports.login = async (req, res) => {
  const {email, password } = req.body;

 
   try{
     const user = await users.findOne({email,password});
  if (user) {
    // token generation 
    const token = jwt.sign({userId:user._id},process.env.SECRET_KEY)
    res.status(200).json({
      user,
      message:"login success",
      token
    });
  } else {
    res.status(401).json("incorrect email or password");
  }
}
catch{
    res.status(400).json("login api failed")
}
}



exports.editProfile = async (req, res) => {
  const { username, linkedIn, gitHub, profile } = req.body;
  const { _id } = req.params;

  const newProfile = req.file ? req.file.filename : profile;

  const user=await users.findOne({_id})
  if(user){
    user.username=username
    user.linkedIn=linkedIn
    user.gitHub=gitHub
    user.profile=newProfile

    await user.save()
    res.status(200).json(user)
  }

  
};


