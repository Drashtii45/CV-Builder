const path = require('path');
const Cv = require("../models/cv");

const saveCV = async(req,res) =>{
    try{
        const existingCVs = await Cv.countDocuments({
            userId : req.session.userId 
        })

        if(existingCVs >=3 ){
            return res.send("You can create upto 3cvs . Delete an existing cv to create new one")
        }

    
    const {
            title,
            fullname,
            email,
            phone,
            linkedin,
            github,
            college,
            degree,
            cgpa,
            skills,
            projects,
            experience,
        } = req.body;

    const cv = new Cv ({
         userId : req.session.userId,
            title,

            personalInfo: {
                fullname,
                email,
                phone,
                linkedin,
                github
            },

            education: {
                college,
                degree,
                cgpa
            },

       skills,
       projects,
       experience,
    });

    await cv.save();
    
   res.redirect(`/templates/${cv._id}`);

 } catch (error) {

        console.log(error);
        res.status(500).send("Something went wrong");

    }
};

const UpdateCv = async(req,res)=>{
    const {
        title,
        fullname,
        email,
        phone,
        linkedin,
        github,
        college,
        degree,
        cgpa,
        skills,
        projects,
        experience
    } = req.body;

    await Cv.findByIdAndUpdate(req.params.id, {
        title,

        personalInfo: {
            fullname,
            email,
             phone,
            linkedin,
            github
        },

        education: {
            college,
            degree,
            cgpa
        },

        skills,
        projects,
        experience
    });

    res.redirect("/my-cvs");
};


module.exports = {
    saveCV ,
    UpdateCv
};

