import express from "express";
import { isAdmin } from "../middlewares/isAdmin";
import {
  GetAllUsers,
//   GetAllProfessionals,
  GetAllAppointments,
  DeleteUser,
  DeleteProfessional,
  DeleteAppointment,
  verifyProfessional,
} from "../controllers/adminController";

const router = express.Router();

router.get("/all-users", GetAllUsers);

router.get("/all-appointments", GetAllAppointments);

// router.get("/all-professionals", GetAllProfessionals);

router.delete("/users/:id", isAdmin, DeleteUser);

router.delete("/appointment/:id", isAdmin, DeleteAppointment);

router.delete("/professional/:id", DeleteProfessional);

router.patch('/update-professional/:id', verifyProfessional);

export default router;
