import mongoose , {Schema} from "mongoose";

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
        unique : true
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


export const User = mongoose.model.User ?? mongoose.model("User" , userSchema)