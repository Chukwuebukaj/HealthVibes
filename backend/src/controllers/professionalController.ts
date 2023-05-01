import { Request, Response } from "express";
const { v4: uuidv4 } = require("uuid");
import { ProfessionalInstance } from "../models/professionalModel";
import bcrypt from "bcrypt";
const fs = require("fs");

enum ProfessionalStatus {
  Pending = "Pending",
  Verified = "Verified",
}

const getProfessional = async (req: Request, res: Response) => {
  try {
    const professionals = await ProfessionalInstance.findAll({
      attributes: { exclude: ["CV", "password"] }, 
    });
    return res.status(200).json({
      data: professionals,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err: "Server error",
    });
  }
};

const getProfessionalById = async (req: Request, res: Response) => {
  try {
    const professionalId = req.params.id;
    const professional = await ProfessionalInstance.findByPk(professionalId, {
      attributes: {exclude: ["CV", "password"]}
    })
    if(!professional){
      return res.status(400).json({
        error: "Professional not found"
      })
    }
    return res.status(200).json({
      data: professional
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err: "SERVER ERROR"
    })
  }
}

const createProfessional = async (req: Request, res: Response) => {
  try {
    let fields = req.fields;
    let files = req.files;
    if (fields) {
      let email = fields.email;
      let name = fields.name;
      let availability = fields.availability;
      let rate = fields.rate;
      let phoneNumber = fields.phoneNumber;
      let linkedin = fields.linkedin;
      if (typeof name !== "string") {
        return res.status(400).send("Invalid name");
      }
      if (typeof email !== "string") {
        return res.status(400).send("Invalid email");
      }
      if (typeof availability !== "string") {
        return res.status(400).send("Invalid availabilty");
      }
      if (typeof rate !== "string") {
        return res.status(400).send("Invalid rate");
      }
      if (typeof phoneNumber !== "string") {
        return res.status(400).send("Invalid phone number");
      }
      if (typeof linkedin !== "string") {
        return res.status(400).send("Invalid linkedin");
      }
      let existingUser = await ProfessionalInstance.findOne({
        where: { email },
      });
      if (existingUser) {
        return res.status(404).send("User already exists");
      }
      let password = fields.password;
      if (typeof password !== "string") {
        return res.status(400).send("Invalid password");
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      let fileArray = Array.isArray(files) ? files : [files];
      let cvPath = fileArray[0]?.CV?.path;
      let imagePath = fileArray[0]?.image?.path;      
      const newProfessional = await ProfessionalInstance.create({
        id: uuidv4(),
        name: name,
        email: email,
        password: encryptedPassword,
        image: imagePath,
        CV: cvPath,
        availability: availability,
        rate: rate,
        phoneNumber: phoneNumber,
        linkedin: linkedin,
        status: ProfessionalStatus.Pending,
      });
      return res.status(201).json({
        message: "Professional has been created",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {createProfessional, getProfessional, getProfessionalById};
