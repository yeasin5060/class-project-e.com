import { User } from "../models/user.models.js";
import { mail } from "../utils/sendMail.js";
import { varification } from "../utils/emailText.js";

const register = async (req ,res) => {
    try {
        const { userName , email , password ,phoneNumber} = req.body;

        if([userName , email , password ,phoneNumber].some((fieid) => fieid ?.trim() === "")){
            return res.json("all field is required")
        }

        const existingUser = await User.findOne({
            $or : [{ email , userName}]
        });

        if(existingUser){
            return res.json({
                message : "all ready user existing",
                status : 400,
            });
        };

        const user = await User.create({userName : userName , email : email , password : password ,phoneNumber :phoneNumber});
        const createUser = await User.findById(user._id).select("-password")

        if(!createUser){
            return res.json({
                status : 400,
                message : "invalide user"
            });
        };

        await mail( createUser.email , "varification" ,"hello" ,varification())

        res.status(200).json({
            message : createUser,
            status : 200
        });
        
    } catch (error) {
        console.log("register controller error" , error.message);
        
    }
}

export{register}