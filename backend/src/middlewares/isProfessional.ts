import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ProfessionalInstance } from "../models/professionalModel";

const jwtsecret = process.env.JWT_SECRET as string;

export const isProfessional = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.cookies.token;

    if (!authorization) {
      return res.redirect("/login");
    }

    let verifiedProfessional = jwt.verify(authorization, jwtsecret);

    if (!verifiedProfessional) {
      return res.redirect("/login");
    }

    const { id } = verifiedProfessional as { [key: string]: string };

    const professional = await ProfessionalInstance.findOne({ where: { id } });

    if (!professional) {
      return res.redirect("/login");
    }

    req.professional = verifiedProfessional;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
};
