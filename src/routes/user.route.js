import { Router } from "express";
import { emailVerified, forgetPassword, getUser, login, logOut, register, userRole, userUpdate } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router()

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/:link").get(emailVerified);
router.route("/forget/password").post(forgetPassword);
router.route("/getuser").get(auth,getUser);
router.route("/logout").post(auth,logOut);
router.route("/role").post(auth,userRole);
router.route("/update/profile").post(auth,upload.single('profilePic') ,userUpdate);

export default router