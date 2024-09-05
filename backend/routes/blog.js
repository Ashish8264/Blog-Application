const express=require("express");
const authController =require( "../controller/authController");
const router=express.Router();
const BlogController=require("../controller/blogController")
const categoryController=require("../controller/categorycontroller")
const multer = require("multer");
const checkIsuserAuthenticated=require("../middleware/authmidddleware")

//multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload'); // Specify the destination folder
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const  upload=multer({ storage:storage});


router.post("/user/register",authController.userRegistration);
router.post("/user/login",authController.userLogin);

//Protected routes

router.get("/get/allblogs",checkIsuserAuthenticated,BlogController.getAllblogs)
router.post("/add/blog",upload.single("thumbnail"),checkIsuserAuthenticated,BlogController.addnewblog)
router.get("/get/blog/:id",checkIsuserAuthenticated,BlogController.getSingleblog)

router.get("/get/categories",checkIsuserAuthenticated,categoryController.getAllCategories)
router.post("/add/categories",checkIsuserAuthenticated,categoryController.addnewCatgory)
module.exports=router;
