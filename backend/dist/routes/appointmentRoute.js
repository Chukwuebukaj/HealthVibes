"use strict";
// import express, { Router } from "express";
// import { createAppointment} from "../controllers/appointmentController";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// export default router;
const express_1 = __importDefault(require("express"));
const appointmentController_1 = require("../controllers/appointmentController");
const isUser_1 = require("../middlewares/isUser");
const isProfessional_1 = require("../middlewares/isProfessional");
const router = express_1.default.Router();
router.post("/booking/:id", appointmentController_1.createAppointment);
router.post("/pending", isUser_1.isUser, appointmentController_1.getPendingAppointments);
router.post("/status", isUser_1.isUser, appointmentController_1.getAppointmentsByStatus);
router.post("/accept", isProfessional_1.isProfessional, appointmentController_1.acceptAppointment);
router.post("/decline", isProfessional_1.isProfessional, appointmentController_1.declineAppointment);
exports.default = router;
//# sourceMappingURL=appointmentRoute.js.map