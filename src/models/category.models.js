import mongoose , {Schema} from "mongoose";

const categorySchema = new Schema({
    name : {
        type : String,
        required : true
    },
    slug : {
        type : String,
        required : true,
        unique : true
    },
    subcategory : [
        {
            type : Schema.Types.ObjectId,
            ref : "subCategory"
        }
    ]
},{
    timestamps : true
});

export const Category = mongoose.model.Category ?? mongoose.model("Category" , categorySchema);