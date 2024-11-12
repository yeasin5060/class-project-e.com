import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cloudinaryFileUpload } from "../utils/clodinary.js";

const product = async (req , res) => {
    try {
        const {title, slug , category , subcategory} = req.body;

        if([title , category ,subcategory].some((field) => field == "" )){
            return res.json(new ApiError(400 , "title , category , subcategory is require"));
        };

        const {thumbnail} = req.files;

        if(!thumbnail){
            return res.json(new ApiError(400 , "thumbnail is require"));
        }
        let newSlug ;
        if(!slug){
            newSlug = title.replaceAll(" " , "-").toLowerCase() + Date.now();
        }else{
            const isSlugUnique = await Product.find({slug})
            if(isSlugUnique){
                return res.json(new ApiError(400 , "slug must be unique"));
            };
            newSlug = isSlugUnique.replaceAll(" ","-").toLowerCase() + Date.now();
        };

        const {path} = thumbnail[0]

        const result = await cloudinaryFileUpload(path,slug,"product")

        console.log(result);
        

        const product = new Product();
        product.title = title;
        product.category = category;
        product.subcategory = subcategory;
        product.slug = newSlug;
        product.thumbnail.imagePath = result.optimizeUrl;
        product.thumbnail. publicId = result.uploadResult.public_id;
        await product.save()
        return res.json(new ApiResponse(200, "product is create" , product))
    } catch (error) {
        console.log("product controller error" , error.message);
    };
};

export{product}