import express from "express";
// import {createUser} from "../controllers/usercontroller";
import { loginUser, RegisterUser } from "../controllers/logincontroller";
const router = express.Router();
router.post("/login", loginUser);
router.post("/register", RegisterUser);
// router.post("/registeruser", createUser)
export default router;
