"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import {createUser} from "../controllers/usercontroller";
const logincontroller_1 = require("../controllers/logincontroller");
const router = express_1.default.Router();
router.post("/login", logincontroller_1.loginUser);
router.post("/register", logincontroller_1.RegisterUser);
// router.post("/registeruser", createUser)
exports.default = router;
//# sourceMappingURL=userRoutes.js.map