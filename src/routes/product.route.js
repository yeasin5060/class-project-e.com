import { Router } from "express";
import { product } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()


router.route("/products/create").post(upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]),product)

export default router