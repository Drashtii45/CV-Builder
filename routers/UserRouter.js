const path = require('path');

const express =  require('express');
const User = require("../models/user");
const { registerUser } = require('../controllers/userController');
const { Userlogin } = require('../controllers/userController');
const { logout } = require('../controllers/userController');
const { saveCV } = require('../controllers/cvController');
const { UpdateCv } = require('../controllers/cvController');



const auth = require("../middlewares/auth");
const Cv = require('../models/cv');

const userRouter = express.Router();



userRouter.get("/", (req,res,next)=>{
    res.sendFile(path.join(__dirname,"..","views","home.html"));
})

userRouter.get("/features", (req,res,next)=>{
    res.sendFile(path.join(__dirname,"..","views","features.html"));
})

userRouter.get("/about", (req,res,next)=>{
    res.sendFile(path.join(__dirname,"..","views","about.html"));
})

userRouter.get("/login", (req,res,next)=>{
    res.sendFile(path.join(__dirname,"..","views","login.html"));
})


userRouter.get("/register", (req,res,next)=>{
    res.sendFile(path.join(__dirname,"..","views","register.html"));
})
 userRouter.get("/success", (req,res,next)=>{
    res.sendFile(path.join(__dirname,"..","views","success.html"));
})


userRouter.get("/dashboard", auth, async (req, res) => {

    const cvs = await Cv.find({
        userId: req.session.userId
    });

    const totalCVs = cvs.length;

    const totalDownloads = cvs.reduce((sum, cv) => {
        return sum + cv.downloads;
    }, 0);

    res.render("dashboard", {

        totalCVs,

        totalDownloads

    });

});

userRouter.get("/logout" , logout);

userRouter.get("/create-cv", auth, (req, res) => {
    res.render("editCV", {
        cv: null,
        isEdit: false
    });
});
userRouter.get("/templates/:id" , async(req,res)=>{
    const cv = await Cv.findById(req.params.id);
    res.render("template",{cv});
})

userRouter.get("/preview/template1/:id", async (req, res) => {
    const cv = await Cv.findById(req.params.id);
    if (!cv) {
        return res.send("CV not found");
    }
  res.render("templates/template1", {
        cv,
        isPreview: true
    });
});


userRouter.get("/preview/template2/:id", async (req, res) => {
    const cv = await Cv.findById(req.params.id);
    if (!cv) {
        return res.send("CV not found");
    }
  res.render("templates/template2", {
        cv,
        isPreview: true
    });});


userRouter.get("/preview/template3/:id", async (req, res) => {
    const cv = await Cv.findById(req.params.id);
    if (!cv) {
        return res.send("CV not found");
    }
  res.render("templates/template3", {
        cv,
        isPreview: true
    });});


userRouter.get("/preview/template4/:id", async (req, res) => {
    const cv = await Cv.findById(req.params.id);
    if (!cv) {
        return res.send("CV not found");
    }
  res.render("templates/template4", {
        cv,
        isPreview: true
    });
});


userRouter.get("/select-template/:id/:templateNo" , async(req,res) =>{
    const {id,templateNo} = req.params;
    const cv = await Cv.findById(id);
     
    if(!cv){
        return res.send("CV Not Found");
    }
    cv.template = Number(templateNo);

    await cv.save();

    res.redirect(`/resume/${id}`);

})

userRouter.get("/resume/:id", async (req, res) => {

    const cv = await Cv.findById(req.params.id);

    if (!cv) {
        return res.send("CV Not Found");
    }

  res.render(`templates/template${cv.template}`, {
        cv,
        isPreview: false ,
        isDownload : false
    });
});

userRouter.get("/print/:id", async (req, res) => {

    const cv = await Cv.findById(req.params.id);

    if (!cv) {
        return res.send("CV Not Found");
    }

  res.render(`templates/template${cv.template}`, {
        cv,
        isPreview: false ,
        isDownload : true
    });
});

userRouter.get("/my-cvs" , auth , async(req,res)=>{
    const cvs = await Cv.find({
        userId : req.session.userId 
    });

    res.render("myCVs" , { cvs }) ;

})

userRouter.get("/delete-cv/:id" , async(req,res)=>{
    await Cv.findByIdAndDelete(req.params.id);
    res.redirect("/my-cvs");
})

userRouter.get("/edit-cv/:id", async (req, res) => {

    const cv = await Cv.findById(req.params.id);

    if (!cv) {
        return res.send("CV Not Found");
    }

    res.render("editCV", { 
        cv,
        isEdit : true
 });

});

userRouter.get("/profile", auth, async (req, res) => {

    const user = await User.findById(req.session.userId);

    const cvs = await Cv.find({
        userId: req.session.userId
    });

    const downloads = cvs.reduce((sum, cv) => {
        return sum + cv.downloads;
    }, 0);

    res.render("profile", {

        user,

        totalCVs: cvs.length,

        downloads

    });

});

userRouter.get("/test-session",(req,res)=>{
    console.log(req.session);
    res.send("Check Terminal");
});

userRouter.post("/register" , registerUser);
userRouter.post("/login" , Userlogin);
userRouter.post("/create-cv" , saveCV);
userRouter.post("/edit-cv/:id" , UpdateCv);




module.exports = userRouter ; 