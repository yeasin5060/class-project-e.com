import { User } from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";

const auth = async (req , res , next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "");

        if(!token){
            return res.status(400).json(new ApiError(200 , "unauthorized access"));
        };

        const decodedToken = jwt.verify(token , process.env.GENERATE_ACCESSTOKEN_SECRET);

        if(!decodedToken){
            return res.status(400).json(new ApiError(200 , "unauthorized access"));
        }

        const user = await User.findById(decodedToken._id);
        req.user = user;
        next()
    } catch (error) {
        console.log("auth middleware error" , error.message);
    }
}