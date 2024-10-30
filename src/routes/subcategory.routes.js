import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminauth } from "../middlewares/admimauth.muddleware.js";
import { allCategory, subCategory } from "../controllers/subcategory.controller.js";


const router = Router()

router.route("/subcategorys/create").post(auth,adminauth,subCategory);
router.route("/subcategorys/allcategory").get(allCategory);


export default router;