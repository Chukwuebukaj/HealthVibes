"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAppointment = exports.DeleteProfessional = exports.DeleteUser = exports.GetAllAppointments = exports.GetAllProfessionals = exports.GetAllUsers = void 0;
const userModel_1 = require("../models/userModel");
const appointmentModel_1 = require("../models/appointmentModel");
const professionalModel_1 = require("../models/professionalModel");
// import { authorization } from './middlewares/authorization';
// Get all users
const GetAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.UserInstance.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.GetAllUsers = GetAllUsers;
// Get all professionals
const GetAllProfessionals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professionals = yield professionalModel_1.ProfessionalInstance.findAll();
        res.status(200).json(professionals);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.GetAllProfessionals = GetAllProfessionals;
// Get all appointments
const GetAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield appointmentModel_1.AppointmentInstance.findAll();
        res.status(200).json(appointments);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.GetAllAppointments = GetAllAppointments;
// Create a professional (with verification)
// export const CreateProfessional = verifyProfessional, async (req: Request, res: Response) => {
//   try {
//     const professional = await ProfessionalInstance.create(req.body);
//     res.status(201).json(professional);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
// Delete a user
const DeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const deleted = yield userModel_1.UserInstance.destroy({ where: { id: userId } });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.DeleteUser = DeleteUser;
// Delete a professional
const DeleteProfessional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professionalId = req.params.id;
        const deleted = yield professionalModel_1.ProfessionalInstance.destroy({
            where: { id: professionalId },
        });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "Professional not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.DeleteProfessional = DeleteProfessional;
// Delete an appointment
const DeleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentId = req.params.id;
        const deleted = yield appointmentModel_1.AppointmentInstance.destroy({
            where: { id: appointmentId },
        });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "Appointment not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.DeleteAppointment = DeleteAppointment;
//# sourceMappingURL=adminControllers.js.map