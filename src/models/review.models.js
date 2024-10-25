import mongoose , {Schema} from "mongoose";

const reviewproductSchema = new Schema({
    reting : {
        type : Number,
        max : 5
    },
    comment : {
        type : String
    },
    imagereview : {
        type : String
    },
    product : {
        type : Schema.Types.ObjectId,
        ref : "Product"
    }
},{
    timestamps : ture
});


export const Reviewproduct = mongoose.model.Reviewproduct ?? mongoose.model("Reviewproduct" , reviewproductSchema);
