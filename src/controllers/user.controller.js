import { User } from "../models/user.models.js";
import { mail } from "../utils/sendMail.js";
import { varification } from "../utils/emailText.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const generatorAccessAndRefreshtoken = async (user) =>{
    try {
        const accessToken = await user.generatorAccessToken();
        const refreshToken = await user.generatorRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();

        return { accessToken , refreshToken};

    } catch (error) {
        console.log("generator Access And Refreshtoken error" , error.message);
        
    }
}

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
        
    };
};


const login = async (req , res) =>{
    try {
        const {email , password} = req.body;
        if([email , password].some((field) => field ?.trim() === "")){
           return res.status(400).json(new ApiError(400 , "all field is require"));
        };

        const userFound = await User.findOne({
            $or : [{email}]
        })
        if(!userFound){
           return res.status(400).json(new ApiError(400 , "invalied user"));
        };

        const isPasswordCorrect = await userFound.isPasswordCorrect(password);
        if(!isPasswordCorrect){
             res.json(new ApiError(400 , "invalid password or email"))
        }
        const {accessToken , refreshToken} = await generatorAccessAndRefreshtoken(userFound);
        const loginUser = await User.findById(userFound._id).select("-password");

        let options = {
            secure : true,
            httpOnly : true
        };

        res.cookie("accessToken" , accessToken , options).cookie("refreshToken" , refreshToken , options).json(new ApiResponse (200 , "user login successfully" , {loginUser , accessToken}));

    } catch (error) {
        console.log("login error");
        res.status(400).json(new ApiError(400 , "login error" , error.message));
    };
};
export{register ,login}