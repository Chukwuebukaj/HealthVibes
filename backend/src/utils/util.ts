import Joi from "joi";

export const registrationSchema = Joi.object().keys({
  username: Joi.string().required(),
  dob: Joi.date().required(),
  email: Joi.string().trim().lowercase().required(),
  gender: Joi.string().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  interest: Joi.string().required(),
  emergencyContact: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .required(),
  password: Joi.string().min(5).max(16).required(),
  confirm_password: Joi.string().equal(Joi.ref("password")).required(),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(30).required(),
});

export const AppointmentSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  fullName: Joi.string().required(),
  sessionType: Joi.string().required(),
  serviceType: Joi.string().required(),
  sessionDate: Joi.string().required(),
  sessionFrequency: Joi.string().required(),
  additionalInfo: Joi.string(),
});
export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
      abortEarly: false,
      errors: {
        wrap: {
          label: "",
        },
      },
    },
  },
};
