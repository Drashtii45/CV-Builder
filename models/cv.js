const { Template } = require('ejs');
const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user" ,
        required : true  
    },
    title : {
        type: String,
        required : true 
    },
    personalInfo: {
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    linkedin: {
        type: String
    },
    github: {
        type: String
    }
},
  education:{
    college:{
         type: String,
        required: true
    },
    degree :{
        type: String,
        required: true
    },
    cgpa :{
        type: String,
        required: true
    },
  },
 skills: {
    type: String,
    required: true
},
projects:{
    type:String,
    default:""
},

experience:{
    type:String,
    default:""
},
template:{
    type:Number,
    default: 1
},

downloads: {
    type: Number,
    default: 0
} 
})

module.exports =  mongoose.model("cv" , cvSchema) ;