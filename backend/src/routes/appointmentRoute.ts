// import express, { Router } from "express";
// import { createAppointment} from "../controllers/appointmentController";

// const router = express.Router();


// export default router;

import express, { Router } from "express";
import {
  createAppointment,
  getPendingAppointments,
  acceptAppointment,
  declineAppointment,
  getAppointmentsByStatus,
} from "../controllers/appointmentController";
import { isUser } from "../middlewares/isUser";
import { isProfessional } from "../middlewares/isProfessional";

const router = express.Router();

router.post("/booking/:id", createAppointment);

router.post("/pending", isUser, getPendingAppointments);

router.post("/status", isUser, getAppointmentsByStatus);

router.post("/accept", isProfessional, acceptAppointment);

router.post("/decline", isProfessional, declineAppointment);

export default router;