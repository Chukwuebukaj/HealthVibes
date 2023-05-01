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
exports.getAppointmentsByStatus = exports.declineAppointment = exports.acceptAppointment = exports.getPendingAppointments = exports.createAppointment = void 0;
const appointmentModel_1 = require("../models/appointmentModel");
const util_1 = require("../utils/util");
const uuid_1 = require("uuid");
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["Pending"] = "Pending";
    AppointmentStatus["Accepted"] = "Accepted";
    AppointmentStatus["Declined"] = "Declined";
})(AppointmentStatus || (AppointmentStatus = {}));
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const User = req.user;
        const Professional = req.params;
        const uuid = (0, uuid_1.v4)();
        const { email, fullName, serviceType, sessionType, sessionDate, sessionFrequency, additionalInfo, } = req.body;
        //========================Validation========================/
        const validation = util_1.AppointmentSchema.validate(req.body, util_1.options);
        if (validation.error) {
            return res.status(400).json({
                error: validation.error.details[0].message,
            });
        }
        //===================Creating appointment===================/
        const appointment = yield appointmentModel_1.AppointmentInstance.create({
            id: uuid,
            email,
            fullName,
            serviceType,
            sessionType,
            sessionDate,
            sessionFrequency,
            additionalInfo,
            status: AppointmentStatus.Pending,
            // userId: User.id,
            professionalId: Professional.id,
        });
        return res.status(201).json({
            msg: "Appointment created successfully",
            appointment,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createAppointment = createAppointment;
const getPendingAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all appointments with status "Pending"
        const appointments = yield appointmentModel_1.AppointmentInstance.findAll({
            where: { status: AppointmentStatus.Pending },
        });
        return res.status(200).json(appointments);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getPendingAppointments = getPendingAppointments;
const acceptAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appointmentId } = req.params;
        // Update the status of the appointment with the given ID to "Accepted"
        const [numOfAffectedRows, affectedRows] = yield appointmentModel_1.AppointmentInstance.update({ status: AppointmentStatus.Accepted }, {
            where: { id: appointmentId, status: AppointmentStatus.Pending },
            returning: true,
        });
        // If no rows were affected, it means that the appointment was not found or its status was not "Pending"
        if (numOfAffectedRows === 0) {
            return res.status(404).json({
                message: "Appointment not found or has already been accepted/declined",
            });
        }
        // Return the updated appointment with status 200
        return res.status(200).json({
            msg: "Appointment accepted successfully",
            appointment: affectedRows[0],
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.acceptAppointment = acceptAppointment;
const declineAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appointmentId } = req.params;
        // Update the status of the appointment with the given ID to "Declined"
        const [numOfAffectedRows, affectedRows] = yield appointmentModel_1.AppointmentInstance.update({ status: AppointmentStatus.Declined }, {
            where: { id: appointmentId, status: AppointmentStatus.Pending },
            returning: true,
        });
        // If no rows were affected, it means that the appointment was not found or its status was not "Pending"
        if (numOfAffectedRows === 0) {
            return res.status(404).json({
                message: "Appointment not found or has already been accepted/declined",
            });
        }
        // Return the updated appointment with status 200
        return res.status(200).json({
            msg: "Appointment declined successfully",
            appointment: affectedRows[0],
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.declineAppointment = declineAppointment;
const getAppointmentsByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.params;
        // Get all appointments with the given status
        const appointments = yield appointmentModel_1.AppointmentInstance.findAll({
            where: { status },
        });
        return res.status(200).json(appointments);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getAppointmentsByStatus = getAppointmentsByStatus;
//# sourceMappingURL=appointmentController.js.map