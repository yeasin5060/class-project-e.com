
export const adminauth = async (req , res , next) => {
    try {
        if(req.user.role == "user" && req.user.role == "seller"){
            return res.send("access denied")
        }
        next();
    } catch (error) {
        console.log("auth middleware error" , error.message);
    }
}