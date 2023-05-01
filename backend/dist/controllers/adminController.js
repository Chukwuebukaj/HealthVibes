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
exports.DeleteAppointment = exports.DeleteProfessional = exports.DeleteUser = exports.verifyProfessional = exports.GetAllAppointments = exports.GetAllUsers = void 0;
const userModel_1 = require("../models/userModel");
const appointmentModel_1 = require("../models/appointmentModel");
const professionalModel_1 = require("../models/professionalModel");
var ProfessionalStatus;
(function (ProfessionalStatus) {
    ProfessionalStatus["Pending"] = "Pending";
    ProfessionalStatus["Verified"] = "Verified";
})(ProfessionalStatus || (ProfessionalStatus = {}));
// Get all users
const GetAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.UserInstance.findAll();
        return res.status(200).json({
            data: users,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.GetAllUsers = GetAllUsers;
// Get all professionals
// export const GetAllProfessionals = async (req: Request, res: Response) => {
//   try {
//     const professionals = await ProfessionalInstance.findAll();
//     res.status(200).json(professionals);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// Get all appointments
const GetAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield appointmentModel_1.AppointmentInstance.findAll();
        return res.status(200).json({
            data: appointments,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            err: "Server error",
        });
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
const verifyProfessional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professionalId = req.params.id;
        // Update the status of the appointment with the given ID to "Accepted"
        const [numOfAffectedRows, affectedRows] = yield professionalModel_1.ProfessionalInstance.update({ status: ProfessionalStatus.Verified }, {
            where: { id: professionalId, status: ProfessionalStatus.Pending },
            returning: true,
        });
        if (numOfAffectedRows === 0) {
            return res.status(404).json({
                message: "Professional not found or has already been accepted/declined",
            });
        }
        // Return the updated professional with status 200
        return res.status(200).json({
            msg: "Professional accepted successfully",
            professional: affectedRows[0],
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.verifyProfessional = verifyProfessional;
// Delete a user
const DeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Delete a user
    try {
        const userId = req.params.id;
        const user = yield userModel_1.UserInstance.findOne({
            where: { id: userId },
        });
        if (!user) {
            return res.render("Dashboard", { Error: "User not found" });
        }
        yield user.destroy();
        return res.redirect("/admindashboard");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.DeleteUser = DeleteUser;
// Delete a professional
const DeleteProfessional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professionalId = req.params.id;
        const professional = yield professionalModel_1.ProfessionalInstance.findOne({
            where: { id: professionalId },
        });
        if (!professional) {
            return res.render("Dashboard", { Error: "Professional not found" });
        }
        yield professional.destroy();
        return res.redirect("/admindashboard");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.DeleteProfessional = DeleteProfessional;
// Delete an appointment
const DeleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentId = req.params.id;
        const appointment = yield appointmentModel_1.AppointmentInstance.findOne({
            where: { id: appointmentId },
        });
        if (!appointment) {
            return res.render("Dashboard", { Error: "Appointment not found" });
        }
        yield appointment.destroy();
        return res.redirect("/admindashboard");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.DeleteAppointment = DeleteAppointment;
//# sourceMappingURL=adminController.js.map