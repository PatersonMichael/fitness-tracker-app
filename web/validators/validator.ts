import Joi from "joi";
import { IUserAuthDataRequest } from "../@types/IUserAuthData";

const validator = (schema: any) => (payload: any) =>
  schema.validate(payload, { abortEarly: false });

const signUpSchema = Joi.object<IUserAuthDataRequest>({
  emailAddress: Joi.string()
    .required()
    .lowercase()
    .email({ tlds: false })
    .max(320),
  password: Joi.string().required().max(72).min(8),
});

export const validateLogin = validator(signUpSchema);
