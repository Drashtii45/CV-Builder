const path = require("path");
const User = require("../models/user");
const bcrypt = require("bcrypt")

const registerUser = async(req,res)=>{
    const {name,email,password} = req.body;
   
    const hashedPassword = await bcrypt.hash(password,12) ; 
         
    
    const user = new User({
        name,
        email,
        password : hashedPassword,
    });
        await user.save();

        res.redirect("/success");


}

const Userlogin = async(req,res)=>{
   const{email,password} =req.body;
    
   const user = await User.findOne({email:email})
   if(!user){
      return res.redirect("/login");   }

    const  isMatch = await bcrypt.compare(password , user.password);
  if(!isMatch){
           return res.redirect("/login");     
  }
  req.session.isLoggedIn = true;
  req.session.userEmail = user.email;
  req.session.userId = user._id ;  


  console.log("After login session:", req.session);
req.session.save(() => {
    res.redirect("/dashboard");
});
}

const logout = (req,res) => {
      req.session.destroy(()=>{
        res.redirect("/")
      })
}


module.exports = {registerUser, Userlogin , logout};