import { User } from "../models/user.models.js";
import { mail } from "../utils/sendMail.js";
import { varification } from "../utils/emailText.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { sendVerified } from "../utils/sendVerifiedSms.js";
import { cloudinaryFileUpload } from "../utils/clodinary.js";
import { json } from "express";


                    // generator Access And Refreshtoken
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
            //user register
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

        res.status(200).json({
            message : createUser,
            status : 200
        });
        
    } catch (error) {
        console.log("register controller error" , error.message);  
    };
};

                    //user login
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

        const link = await userFound.generatorAccessToken();

        const userVerified = await User.findOne({emailVerified})
        console.log(userVerified);
    
       /* if(userVerified){
            await mail( loginUser.email , "varification" ,"hello" ,varification(link));
        }else{
            return res.status(400).json(new ApiError(400 , "user allredy verified"));
        }*/
        res.cookie("accessToken" , accessToken , options).cookie("refreshToken" , refreshToken , options).json(new ApiResponse (200 , "user login successfully" , {loginUser , accessToken}));

    } catch (error) {
        console.log("login error");
        res.status(400).json(new ApiError(400 , "login error" , error.message));
    };
};

                    // user mail verified
const emailVerified = async (req , res) => {
    try {
        const {link} = req.params;
        const user = new User();
        const result = await user.emailVerifiedToken (link);
        
        if(result){
            const {email} = result;
            const userFound = await User.findOne({email})

            if (userFound) {
                userFound.emailverified = "verified"
                await userFound.save()
                return res.send(sendVerified())
            }else{
                 return res.send("your email is invalied")
            }
        }else{
            return res.send("invalied url")
        }
    } catch (error) {
        console.log("email verify error" , error.message);
    }
}

                // forget password
const forgetPassword = async (req, res) => {
    try {
        const {email , newpassword} = req.body;
        if([email , newpassword].some((field) => field?.trim() === '')){
            return res.status(400).json({
                message : "all field require "
            });
        };

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json(new ApiError(400 ,"invalied user"));
        };


        user.password = newpassword;
        user.save({validationBeforeSave : false});

        const updatePassword = await User.findById(user._id).select("-password");

        res.status(200).json(new ApiResponse(200 , "forget password successfully" , updatePassword))
    } catch (error) {
        console.log("forget password error" , error.message);
        
    };
};

                //get user
const getUser = async (req , res) => {
    try {
        const user = await req.user;
        const getUser = await User.findById(user._id).select("-password");
        return res.status(200).json(new ApiResponse (200 ,getUser , "get user sucessfully"));
    } catch (error) {
        console.log("get user error" , error.message);
    };
};


const logOut = async (req , res) => {
    try {
        await User.findByIdAndUpdate(req.user , {
            $set : {
                refreshToken : null
            }
        });

        const logOutUser = await User.findById(req.user._id).select("-password");

        let options = {
            secure : true,
            httpOnly : true
        };

        return res.clearCookie("accessToken" , options).clearCookie("refreshToken" , options).json(new ApiResponse(200 ,"user logout successfully" ,logOutUser));
           
    } catch (error) {
        console.log("logout error" , error.message);
        res.json(new ApiError(400 , "logout filed"));
    }
}

const userRole = async ( req , res) => {
    try {
        const {role} = req.body;

        if(role == ''){
            return res.json(new ApiError(400 , "role field is require"))
        }

        const user = await User.findById(req.user._id);

        if(!user){
            return res.json(new ApiError(400 , "invelied user"))
        }

        if(user.role == "user" && user.role == "seller"){
            return res.json(new ApiError(400 , "access denied"))
        }

        user.role = role;

        await user.save({validationBeforeSave : false});
        
        return res.json(new ApiResponse(200 , "role create successfully" , user))
       
    } catch (error) {
        console.log("user role error", error.message);
    }
}

const userUpdate = async (req ,res) => {
    try {
       if(req.file){
        const {path} = req.file;
        const user = await User.findOne(req.user._id)
        const result = await cloudinaryFileUpload(path, user.userName , "profilePic");
        user.profilePic = result.optimizeUrl;
        user.publicId = result.uploadResult.public_id;
        await user.save()
        return res.json(new ApiResponse(200, "update profile succesfully",user))
       }
    } catch (error) {
        console.log("update profile error" , error.message);
    };
};


        // all controller export
export{
    register ,
    login , 
    emailVerified ,
    forgetPassword,
    getUser,
    logOut,
    userUpdate,
    userRole
}