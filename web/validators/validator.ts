import Joi from "joi";
import { IUserAuthDataRequest } from "../@types/IUserAuthData";
import { IUserInfo } from "../@types/IUserInfo";

// Regex pattern for strong password
const strongPasswordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

const validator = (schema: any) => (payload: any) =>
  schema.validate(payload, { abortEarly: false });

const loginSchema = Joi.object<IUserAuthDataRequest>({
  emailAddress: Joi.string()
    .required()
    .lowercase()
    .email({ tlds: false })
    .max(320),
  password: Joi.string().required().max(72).min(8),
});

export const validateLogin = validator(loginSchema);

const signUpSchema = Joi.object<IUserInfo>({
  emailAddress: Joi.string()
    .required()
    .lowercase()
    .email({ tlds: false })
    .max(320),
  password: Joi.string().required().min(8).max(72).regex(strongPasswordRegex),
  lastName: Joi.string().required().max(30),
  firstName: Joi.string().required().max(30),
});

export const validateSignUp = validator(signUpSchema);

//password regex rules: At least one lowercase, uppercase, number, symbol, min 8 chars
