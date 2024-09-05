const blogModel = require("../modles/blogModel")
class BlogController {
    static getAllblogs = async (req, res) => {
        try {
            const fetchAllBlog = await blogModel.find({})
            return res.status(200).json(fetchAllBlog)
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    static addnewblog = async (req, res) => {
        const {title,category,description} =req.body;
        try {
            if(title&& category && description){
             const addblog=new blogModel({
                title,
                description,
                category,
               
             });
             const savedblog=await addblog.save();
             if(savedblog){
                return res.status(200).json({message:"blog added suceesfully"});
             }
            }
            else{
                return res.status(400).json({message:"all field are required"});
            }
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
    static getSingleblog = async (req, res) => {
        res.send("single")
    }
}
module.exports = BlogController;