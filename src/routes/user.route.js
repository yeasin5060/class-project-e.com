import { Router } from "express";
import { emailVerified, login, register } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/:link").get(emailVerified);

export default router