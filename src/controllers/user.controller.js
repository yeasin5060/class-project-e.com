import { User } from "../models/user.models.js";

const register = async (req ,res) => {
    try {
        const { userName , email , password} = req.body;

        if([userName , email , password].some((fieid) => fieid ?.trim() === "")){
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

        const user = await User.create({userName : userName , email : email , password : password});
        const createUser = await User.findById(user._id).select("-password");

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

        console.log(createUser);
        

    } catch (error) {
        console.log("register controller error" , error.message);
        
    }
}

export{register}