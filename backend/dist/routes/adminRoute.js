"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAdmin_1 = require("../middlewares/isAdmin");
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
router.get("/all-users", adminController_1.GetAllUsers);
router.get("/all-appointments", adminController_1.GetAllAppointments);
// router.get("/all-professionals", GetAllProfessionals);
router.delete("/users/:id", isAdmin_1.isAdmin, adminController_1.DeleteUser);
router.delete("/appointment/:id", isAdmin_1.isAdmin, adminController_1.DeleteAppointment);
router.delete("/professional/:id", adminController_1.DeleteProfessional);
router.patch('/update-professional/:id', adminController_1.verifyProfessional);
exports.default = router;
//# sourceMappingURL=adminRoute.js.map