import mongoose , {Schema} from "mongoose";

const subcategorySchema = new Schema({
    name : {
        type : String,
        required : true
    },
    slug : {
        type : String,
        required : true,
        unique : true
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : "Category"
    }
},{
    timestamps : true
});


export const Subcategory = mongoose.model.Subcategory ?? mongoose.model("Subcategory" , subcategorySchema)