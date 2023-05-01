import { Request, Response } from "express";
import userInstance from "../models/userModel";
// import Joi from "joi";
// import { UUIDV4 } from "sequelize";
// import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../database/db.config";
import { UUIDV4 } from "sequelize";
// import { createToken } from "../database/storage";

// const registrationSchema = Joi.object({
//   name: Joi.string().required(),
//   dob: Joi.string().required(),
//   email: Joi.string().required(),
//   gender: Joi.string().required(),
//   country: Joi.string().email().required(),
//   city: Joi.string().required(),
//   interests: Joi.string().required(),
//   emergencyContact: Joi.string().pattern(/^[0-9]{11}$/).required(),
//   password: Joi.string().min(5).max(16).required(),
//   password2: Joi.string().valid(Joi.ref('password')).required(),
// });

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      dob,
      email,
      password,
      gender,
      country,
      city,
      interests,
      emergencyContact,
    } = req.body;

    const myId = UUIDV4;
  } catch (error) {}
};

// }

// export {createUser}

// export const createUser = async (req: Request, res: Response) => {
//   console.log("Route has been hit")

//   try {
//     const { error, value } = registrationSchema.validate(req.body, { abortEarly: false });
//     if (error) {
//       console.log('validation error', error.details.map(d => d.message))
//       return res.status(400).send(error.details.map(d => d.message));
//     }
//   }
//   catch (err) {
//     console.log(err)
//   }

//   const iduuid = uuid()
//   const password = req.body.password
//   const gender = req.body.gender
//   const emergencyContact = req.body.emergencyContact
//   const country = req.body.country
//   const city = req.body.city
//   const interests = req.body.interests
//   const name = req.body.doctorsName
//   const email = req.body.email
//   const passTwo = req.body.password2

//   if (email !== '' && password !== '') {
//     if (password === passTwo) {
//       const secret = await bcrypt.genSaltSync(10)
//       const hashedPassword = await bcrypt.hash(password, secret)
//       const user = await userInstance.create({
//         id: iduuid,
//         name,
//         email,
//         gender,
//         country,
//         city,
//         interests,
//         emergencyContact,
//         hashedPassword
//       });
//     }
//   }
//   if (value) {
//     let myToken = createToken(req.body.email, String(iduuid))
//     res.cookie('invisibleToken', myToken, {
//       httpOnly: true,
//       maxAge: 60 * 60 * 24 * 1 * 1000
//     })
//     const verifyToken = req.cookies["invisibleToken"]
//     if (!verifyToken) {
//       res.render('login', { errMessage: "Pls login back as a user " })
//     } else {
//       console.log('its saved successfully')
//       await user.save()
//       res.render('login')
//     }
//   }
// };
// export default createUser;
