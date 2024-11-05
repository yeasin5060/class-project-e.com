import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const product = async (req , res) => {
    try {
        const {title, slug , category , subcategory} = req.body;

        if([title , category ,subcategory].some((field) => field == "" )){
            return res.json(new ApiError(400 , "title , category , subcategory is require"));
        };

        const {thumbnail , gallery} = req.file

        if(!thumbnail){
            return res.json(new ApiError(400 , "thumbnail is require"))
        }
        let newSlug ;
        if(!slug){
            newSlug = title.replaceAll(" " , "-").toLowerCass() + new Date.now()
        }else{
            const isSlugUnique = await Product.find({slug})
            if(!isSlugUnique){
                return res.json(new ApiError(400 , "slug is require"))
            };
            newSlug = isSlugUnique.replaceAll(" ","-").toLowerCass() + new Date.now()
        };
    } catch (error) {
        console.log("product controller error" , error.message);
    };
};

export{product}