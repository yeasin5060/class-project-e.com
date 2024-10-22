import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const auth = async (req , res , next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "");

        if(!token){
           return res.json(new ApiError(401 , "unauthorized access"));
        };
        const decodeToken = jwt.verify(token ,process.env.GENERATE_ACCESSTOKEN_SECRET);
        
        if(!decodeToken){
            return res.json(new ApiError(402 , "unauthorized access"));
        };
        const user = await User.findById(decodeToken._id);
        req.user = user;
        //console.log(req.user);
        
        next();
    } catch (error) {
        console.log("auth middleware error" , error.message);
    }
}