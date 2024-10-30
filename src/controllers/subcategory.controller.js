import { Category } from "../models/category.models.js";
import { Subcategory } from "../models/subcategory.modles.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const subCategory = async (req, res) => {
    try {
        const {name , slug , category} = req.body;
        if(!(name && category)){
            return res.status(400).json({
                message : "name and category require",
            })
        }
        let newSlug ;

        if(!slug){
            newSlug = name.replaceAll(" " ,"-").toLowerCase()
        }else{
           newSlug = slug.replaceAll(" " ,"-").toLowerCase()
        }

        const subCategory = await Subcategory.create({name : name , slug : newSlug , category : category});

        return res.json(new ApiResponse(200 , "subcategory create is database" , subCategory))

    } catch (error) {
        console.log("subcategory error" , error.message);
    }
}

export {subCategory}