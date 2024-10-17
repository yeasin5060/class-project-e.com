import { Router } from "express";
import { emailVerified, forgetPassword, login, register } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/:link").get(emailVerified);
router.route("/forget/password").post(forgetPassword);

export default router