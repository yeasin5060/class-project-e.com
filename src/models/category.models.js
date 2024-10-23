import mongoose , {Schema} from "mongoose";

const categorySchema = new Schema({
    name : {
        type : String,
        required : ture
    },
    slug : {
        type : String,
        required : ture,
        unique : true
    },
    subcategory : {
        type : Schema.Types.ObjectId,
        ref : "subCategory"
    }
},{
    timestamps : true
});

export const Category = mongoose.model.Category ?? mongoose.model("Category" , categorySchema);