import express from "express";
import { getUser, login, logout, register } from "../controller/userController.js";
import { isAuthentication } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthentication, logout);
router.get("/getUser", isAuthentication, getUser);

export default router;