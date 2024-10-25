import { Router } from "express";
import { product } from "../controllers/product.controller.js";

const router = Router()


router.route("/create/product").post(product)

export default router