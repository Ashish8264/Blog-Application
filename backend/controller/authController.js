const authmodel = require("../modles/authModel.js");
const bcryptjs = require("bcryptjs");
const { use } = require("../routes/blog");
const jwt = require("jsonwebtoken")
class authController {
    static userRegistration = async (req, res) => {

        const { username, email, password } = req.body;
        try {
            if (username && email && password) {
                const isUser = await authmodel.findOne({ email: email });
                if (!isUser) {
                    // password hasing
                    const genSalt = await bcryptjs.genSalt(10);

                    const hashedpassword = await bcryptjs.hash(password, genSalt);
                    //save a user
                    const newuser = new authmodel({
                        username,
                        email,
                        password: hashedpassword,
                    });
                    const saveuser = await newuser.save();
                    if (saveuser) {
                        return res.status(200).json({ message: "user registration succesful" })
                    }

                } else {
                    return res.status(400).json({ message: "email are already are register" })
                }
            } else {
                return res.status(400).json({ message: "all field are required" })
            }

        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    };
    static userLogin = async (req, res) => {
        const { email, password } = req.body;
        console.log(req.body);
        try {
            if (email && password) {
                const isEmail = await authmodel.findOne({ email: email });
                if (isEmail) {
                    const isMatch = await bcryptjs.compare(password, isEmail.password);
                    if (isMatch) {
                        const token = jwt.sign({ userID: isEmail._id }, "please", {
                            expiresIn: "2d",
                        });
                        return res.status(200).json({
                            message: "Login successfully",
                            token,
                            name: isEmail.username, // assuming 'username' field is what you want
                        });
                    } else {
                        return res.status(400).json({ message: "wrong credentials" });
                    }
                } else {
                    return res.status(400).json({ message: "email not found" });
                }
            } else {

            
                return res.status(400).json({ message: "all fields arerequired" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };


}
module.exports = authController;