import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminauth } from "../middlewares/admimauth.muddleware.js";
import { allSubCategory, subCategory } from "../controllers/subcategory.controller.js";


const router = Router()

router.route("/subcategorys/create").post(auth,adminauth,subCategory);
router.route("/subcategorys").get(allSubCategory);


export default router;