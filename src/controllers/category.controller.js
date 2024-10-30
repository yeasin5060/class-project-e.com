import { Category } from "../models/category.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const category = async (req, res) => {
    try {
        const {name , slug} = req.body;
        if(!name){
            return res.status(400).json({
                message : "name is require",
            })
        }
        let newSlug ;

        if(!slug){
            newSlug = name.replaceAll(" " ,"-").toLowerCase()
        }else{
           newSlug = slug.replaceAll(" " ,"-").toLowerCase()
        }

        const category = await Category.create({name : name , slug : newSlug});

        return res.json(new ApiResponse(200 , "product create is database" , category))

    } catch (error) {
        console.log("category error" , error.message);
    }
}

export {category}