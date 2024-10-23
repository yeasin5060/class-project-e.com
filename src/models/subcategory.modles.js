import mongoose , {Schema} from "mongoose";

const subcategorySchema = new Schema({
    name : {
        type : String,
        required : ture
    },
    slug : {
        type : String,
        required : ture,
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