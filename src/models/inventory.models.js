import mongoose , {Schema} from "mongoose";

const inventorySchema = new Schema({
    product : {
        type : Schema.Types.ObjectId,
        ref : "Product"
    },
    variation : {
        type : Schema.Types.ObjectId,
        ref : "Variation"
    },
    purchaseprice : {
        type : Number
    },
    sellingprice : {
        type : Number
    },
    discountprice : {
        price : {
            type : Number
        },
        type : {
            type : String,
            enum : ["ammount" , "parcentage"]
        }
    },
    quantity : {
        type : Number
    }
},{
    timestamps : true
});

export const Inventory = mongoose.model.Inventory?? mongoose.model("Inventory" , inventorySchema)