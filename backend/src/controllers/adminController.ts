import { Request, Response } from "express";
import { UserInstance } from "../models/userModel";
import { AppointmentInstance } from "../models/appointmentModel";
import { ProfessionalInstance } from "../models/professionalModel";

enum ProfessionalStatus {
  Pending = "Pending",
  Verified = "Verified",
}

// Get all users
export const GetAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserInstance.findAll();
    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

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
export const GetAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await AppointmentInstance.findAll();
    return res.status(200).json({
      data: appointments,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err: "Server error",
    });
  }
};

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

export const verifyProfessional = async (req: Request, res: Response) => {
  try {
    const professionalId = req.params.id;

    // Update the status of the appointment with the given ID to "Accepted"
    const [numOfAffectedRows, affectedRows] = await ProfessionalInstance.update(
      { status: ProfessionalStatus.Verified },
      {
        where: { id: professionalId, status: ProfessionalStatus.Pending },
        returning: true,
      }
    );

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete a user
export const DeleteUser = async (req: Request, res: Response) => {
  // Delete a user
  try {
    const userId = req.params.id;
    const user = await UserInstance.findOne({
      where: { id: userId },
    });
    if (!user) {
      return res.render("Dashboard", { Error: "User not found" });
    }
    await user.destroy();
    return res.redirect("/admindashboard");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a professional
export const DeleteProfessional = async (req: Request, res: Response) => {
  try {
    const professionalId = req.params.id;
    const professional = await ProfessionalInstance.findOne({
      where: { id: professionalId },
    });
    if (!professional) {
      return res.render("Dashboard", { Error: "Professional not found" });
    }
    await professional.destroy();
    return res.redirect("/admindashboard");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete an appointment
export const DeleteAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await AppointmentInstance.findOne({
      where: { id: appointmentId },
    });
    if (!appointment) {
      return res.render("Dashboard", { Error: "Appointment not found" });
    }
    await appointment.destroy();
    return res.redirect("/admindashboard");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

