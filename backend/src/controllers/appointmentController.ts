import { Request, Response } from "express";
import { AppointmentInstance } from "../models/appointmentModel";
import { AppointmentSchema, options } from "../utils/util";
import { v4 as UUIDV4 } from "uuid";

enum AppointmentStatus {
  Pending = "Pending",
  Accepted = "Accepted",
  Declined = "Declined",
}

export const createAppointment = async (req: Request | any, res: Response) => {
  try {
    // const User = req.user;
    const Professional = req.params;
    const uuid = UUIDV4();

    const {
      email,
      fullName,
      serviceType,
      sessionType,
      sessionDate,
      sessionFrequency,
      additionalInfo,
    } = req.body;

    //========================Validation========================/
    const validation = AppointmentSchema.validate(req.body, options);

    if (validation.error) {
      return res.status(400).json({
        error: validation.error.details[0].message,
      });
    }

    //===================Creating appointment===================/

    const appointment = await AppointmentInstance.create({
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPendingAppointments = async (req: Request, res: Response) => {
  try {
    // Get all appointments with status "Pending"
    const appointments = await AppointmentInstance.findAll({
      where: { status: AppointmentStatus.Pending },
    });

    return res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const acceptAppointment = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.params;

    // Update the status of the appointment with the given ID to "Accepted"
    const [numOfAffectedRows, affectedRows] = await AppointmentInstance.update(
      { status: AppointmentStatus.Accepted },
      {
        where: { id: appointmentId, status: AppointmentStatus.Pending },
        returning: true,
      }
    );

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const declineAppointment = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.params;
    // Update the status of the appointment with the given ID to "Declined"
    const [numOfAffectedRows, affectedRows] = await AppointmentInstance.update(
      { status: AppointmentStatus.Declined },
      {
        where: { id: appointmentId, status: AppointmentStatus.Pending },
        returning: true,
      }
    );

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAppointmentsByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.params;
    // Get all appointments with the given status
    const appointments = await AppointmentInstance.findAll({
      where: { status },
    });

    return res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
