import express from "express";
const router = express.Router();
import formidable from 'express-formidable';
import Joi from "joi";
import {createProfessional, getProfessional, getProfessionalById} from "../controllers/professionalController";

router.get("/professional", getProfessional)
router.get("/professional/:id", getProfessionalById)
router.post(
  "/registerprofessional",
  formidable(),
  createProfessional
);

export default router;
