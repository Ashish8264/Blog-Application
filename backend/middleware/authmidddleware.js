const jwt=require("jsonwebtoken");
const authModel=require("../modles/authModel");

const checkIsuserAuthenticated=async(req,res,next)=>{
    let token;
    const {authorization}=req.headers;
   if(authorization&&authorization.startsWith("Bearer")){

    try {
        token=authorization.split(" ")[1];
        const {userID}=jwt.verify(token,"please");
        req.user=await authModel.findById(userID).select("-password")
        next();
        
    } catch (error) {
        return res.status(401).json({message: "unauthorized user"})
    }
   }else{
    return res.status(401).json({message: "unauthorized user"})
   }
}
module.exports=checkIsuserAuthenticated;