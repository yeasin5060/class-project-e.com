import { Product } from "../models/product.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const product = async (req , res) => {
    try {
        const {title , slug} = req.body;
        if([title , slug].some((field) => field?.trim() === "")){
            return res.json(new ApiError(400, "all field is require"))
        }

        let newSlug ;

        if(slug){
            newSlug = title;
        }else{
            return res.json(new ApiError(400, "slug is not found"));
        }

        const product = await Product.create({title : title , slug : newSlug});

        return res.json(new ApiResponse(200 , "product create is database" , product))

    } catch (error) {
        console.log("product error" , error.message);
    }
}

export{product}