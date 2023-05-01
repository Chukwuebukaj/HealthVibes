import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserInstance } from "../models/userModel";

const jwtsecret = process.env.JWT_SECRET as string;

export const isUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.cookies.token;

    if (!authorization) {
      return res.redirect("/login");
    }

    let verifiedUser = jwt.verify(authorization, jwtsecret);

    if (!verifiedUser) {
      return res.redirect("/login");
    }

    const { id } = verifiedUser as { [key: string]: string };

    const user = await UserInstance.findOne({ where: { id } });

    if (!user) {
      return res.redirect("/registrationuser");
    }

    req.user = verifiedUser;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
};