import mongoose , {Schema} from "mongoose";

const productSchema = new Schema ({
    title : {
        type : String,
        required : true,
        unique : true
    },
    slug : {
        type : String,
        required : true,
        unique : true
    },
    thumbnail : {
        type : String,
    },
    gallery: [
        {
            type : String, 
        }
    ],
    category : {
        type : Schema.Types.ObjectId,
        ref : "Category"
    },
    subcategory : {
         type : Schema.Types.ObjectId,
        ref : "Subcategory"
    },
    inventory : [
        {
             type : Schema.Types.ObjectId,
            ref : "Inventory"
        }
    ],
    discription : {
        type : String
    }
},{
    timestamps : true
});

export const Product = mongoose.model.Product?? mongoose.model("Product" , productSchema);