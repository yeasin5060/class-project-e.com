import mongoose , {Schema} from "mongoose";
import bcrypt, { hash } from 'bcrypt'

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
        select : false
    },
    phoneNumber : {
        type : String,
        unique : true,
        default : null,
        minlength : [11 , "minimum length is 11"],
    },
    emailverified : {
        type :Date
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
    ]
},{
    timestamps : true
})

             //the plane passwors modifielsd hash password
userSchema.pre("save" , async function (next){
    if(this.isModified("password")){
        this.password =  await bcrypt.hash(this.password , 10)
        next()
    }else{
        return next()
    }
})

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


export const User = mongoose.model.User ?? mongoose.model("User" , userSchema)