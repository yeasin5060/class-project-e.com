import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminauth } from "../middlewares/admimauth.muddleware.js";
import { category } from "../controllers/category.controller.js";

const router = Router()

router.route("/categorys/create").post(auth,adminauth,category);


export default router;