import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminauth } from "../middlewares/admimauth.muddleware.js";
import { allCategory, category } from "../controllers/category.controller.js";

const router = Router()

router.route("/categorys/create").post(auth,adminauth,category);
router.route("/categorys").get(allCategory);


export default router;