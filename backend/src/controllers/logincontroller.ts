import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { loginSchema, registrationSchema, options } from "../utils/util";
import { UserInstance } from "../models/userModel";
import { ProfessionalInstance } from "../models/professionalModel";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const jwtsecret = process.env.JWT_SECRET || "default_secret_key";

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const uuid = uuidv4();

    const {
      username,
      email,
      password,
      confirm_password,
      gender,
      country,
      city,
      dob,
      interest,
      emergencyContact,
    } = req.body;

    const validationResult = registrationSchema.validate(req.body, options);

    if (validationResult.error) {
      return res.status(400).json({
        error: validationResult.error.details[0].message,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserInstance.findOne({
      where: { email: email },
    });

    if (!user) {
      let newUser = await UserInstance.create({
        id: uuid,
        username,
        email,
        gender,
        country,
        city,
        dob,
        interest,
        emergencyContact,
        password: hashedPassword,
      });

      const User = (await UserInstance.findOne({
        where: { email: email },
      })) as unknown as { [key: string]: string };

      const { id } = User;
      const token = jwt.sign({ id }, jwtsecret, {
        expiresIn: "30mins",
      });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
      });

      //   return res.redirect("/login");
      return res.status(200).json({ message: "User created successfully" });
    }
    return res.status(400).json({ error: "Email already exists" });
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const resultValidation = loginSchema.validate(req.body, options);

    if (resultValidation.error) {
      return res.render("Login", {
        error: resultValidation.error.details[0].message,
      });
    }

    // If user is a client
    const user = (await UserInstance.findOne({
      where: { email },
    })) as unknown as { [key: string]: string };

    if (user) {
      const loginValidation = await bcrypt.compare(password, user.password);

      if (loginValidation) {
        // return res.redirect("/userdashboard");
        return res.status(200).json({ message: "User logged in Successfully" });
      }
    }

    // If user is a professional
    const professional = (await ProfessionalInstance.findOne({
      where: { email },
    })) as unknown as { [key: string]: string };

    if (professional) {
      const loginValidation = await bcrypt.compare(
        password,
        professional.password
      );

      if (loginValidation) {
        // return res.redirect("/professionaldashboard");
        return res
          .status(200)
          .json({ message: "Professional logged in Successfully" });
      }
    }

    // If user is an admin
    const admins = [
      {
        email: "muhammadalkali.muawiya@decagon.dev",
        name: "MM Alkali",
        phone: "+2347080407711",
      },
      {
        email: "favour.adjushi@decagon.dev",
        name: "Favour Adjushi",
        phone: "+2348122788996",
      },
      {
        email: "otonye.amietubodie@decagon.dev",
        name: "Otonye Amietubodie",
        phone: "+2348124015475",
      },
      {
        email: "damilola.adegoke@decagon.dev",
        name: "Damilola Adegoke",
        phone: "+2348188270170",
      },
      {
        email: "chukwuebuka.anunihu@decagon.dev",
        name: "Chukwuebuka Anunihu",
        phone: "+2347064527012",
      },
    ];

    const adminPassword = "ThisIsTheAdminPassword!";

    const admin = admins.find(
      (admin) => admin.email === email && adminPassword === password
    );

    if (admin) {
      // return res.redirect("/admindashboard");
      return res.status(200).json({ message: "Admin logged in Successfully" });
    }

    res.status(400).json({ error: "Invalid email/password" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error,
    });
  }
};
