import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminauth } from "../middlewares/admimauth.muddleware.js";
import { subCategory } from "../controllers/subcategory.controller.js";


const router = Router()

router.route("/subcategorys/create").post(auth,adminauth,subCategory);


export default router;