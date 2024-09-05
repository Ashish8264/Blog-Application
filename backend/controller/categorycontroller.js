const cateograyModel  = require("../modles/cateograyModel.js");
class categoryController {
    static getAllCategories = async (req, res) => {
        try {
            const fetchAllCategories = await cateograyModel.find({});
            return res.status(200).json(fetchAllCategories);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

    }
    static addnewCatgory = async (req, res) => {
        const {title}=req.body;
        try{
            if(title)
            {
                const newCategory= new cateograyModel({
                  title,
                })
                const savedCategory=await newCategory.save();
                if(savedCategory)
                {
                    return res.status(200).json({message:"category added Sucessfully"});
                }
            }
            else{
              return res.status(200).json({message:"all field are required"});
            }

        }catch(error){
            return res.status(400).json({ message: error.message });
        }
    }
}
module.exports = categoryController;