import { Request, Response, NextFunction } from "express";

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

export const isAdmin = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const userEmail = req.user?.email;

  const isAdmin = admins.find((admin) => admin.email === userEmail);

  if (isAdmin) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized access." });
  }
};