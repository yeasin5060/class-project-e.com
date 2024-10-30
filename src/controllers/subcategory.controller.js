import { Category } from "../models/category.models.js";
import { Subcategory } from "../models/subcategory.modles.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const subCategory = async (req, res) => {
    try {
        const {name , slug , category} = req.body;
        if(!(name && category)){
            return res.status(400).json({
                message : "name and category require",
            });
        };
        let newSlug ;

        if(!slug){
            newSlug = name.replaceAll(" " ,"-").toLowerCase();
        }else{
           newSlug = slug.replaceAll(" " ,"-").toLowerCase();
        };

        const subCategory = await Subcategory.create({name : name , slug : newSlug , category : category});

        await Category.updateOne({_id : category},{$push : {subcategory : subCategory._id}});

        return res.json(new ApiResponse(200 , "subcategory create is database" , subCategory));

    } catch (error) {
        console.log("subcategory error" , error.message);
    };
};

const allCategory = async (_, res) => {
    try {
        const data = await Subcategory.find().populate("category");
        res.json(new ApiResponse(200 , "all subcategory get done" , data));
    } catch (error) {
        console.log("all category error" , error.message);
    };
};

export {subCategory , allCategory}