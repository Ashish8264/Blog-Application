const  mongoose=require("mongoose");
const categorySchema=new mongoose.Schema({
    title:{
        type:String,
    }
});
const cateograyModel = mongoose.model('Category', categorySchema);

module.exports = cateograyModel;