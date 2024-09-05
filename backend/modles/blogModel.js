const mongoose=require("mongoose");
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    category:{
        type:String,
    },
    description:{
        type:String,
    },
  
})
const blogModel=mongoose.model("blog",blogSchema);
module.exports = blogModel;