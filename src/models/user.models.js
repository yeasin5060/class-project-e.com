import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken"

const userSchema = new Schema ( {
    userName : {
        type : String,
        required : [true , "username is required"],
        trim : true
    },
    email : {
        type : String,
        required : [true , "email is required"],
        trim : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : [true , "password is required"],
        minlength : [8 , "minimum length is 8"],
    },
    phoneNumber : {
        type : String,
        unique : true,
        default : null,
        minlength : [11 , "minimum length is 11"],
    },
    emailverified : {
        type :String,
        date : new Date()
    },
    publicId : {
        type : String
    },
    role : {
        type : String,
        enum : ["user" , "admin" , "seller" , "editor"],
        lowercase : true
    },
    resetpasswordToken : {
        type : String,
    },
    address : [
        {strret : String} , {country :String },{postalcode : String} , {district : String}
    ],
    refreshToken : {
        type : String,
    },
},{
    timestamps : true
})

    //the plane passwors modifielsd hash password
userSchema.pre("save" , async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10);
        next();
    }else{
        return next();
    }
});            
         
             //the compare password and hash password
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare( password , this.password);
};
         
                  //generator access token
userSchema.methods.generatorAccessToken = async function(){
   const accesstoken = jwt.sign({_id : this._id , email : this.email , userName : this.userName}, process.env.GENERATE_ACCESSTOKEN_SECRET, 
    {expiresIn: process.env.ACCESSTOKEN_EXPIRY });
    return accesstoken
}

                    //generator refresh token
userSchema.methods.generatorRefreshToken = async function () {
    const refreshtoken = jwt.sign({_id : this._id , email : this.email},process.env.GENERATE_REFRESHTOKEN_SECRET,{
        expiresIn :process.env.REFRESHTOKEN_EXPIRY
    });
    return refreshtoken;
};

userSchema.methods.emailVerifiedToken =  function (token) {
    return jwt.verify(token,process.env.GENERATE_ACCESSTOKEN_SECRET, function(err, decoded) {
        if (err) {
            return err
        }
        console.log(decode);
        
        return decoded
      });
    
};


export const User = mongoose.model.User ?? mongoose.model("User" , userSchema)