const auth = (req,res,next)=>{
    console.log("URL:", req.originalUrl);
    console.log("Session:", req.session);

    if(!req.session.isLoggedIn){
                console.log("❌ Not logged in");

        return res.redirect("/login");
    }
        console.log("✅ Logged in");

    next();
}
module.exports = auth ; 
