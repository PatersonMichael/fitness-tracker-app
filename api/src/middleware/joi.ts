import Joi, { ObjectSchema } from 'joi';
import Logging from '../lib/logging';
import { IUserProfile } from '../models/user-profile';
import { NextFunction, Request, Response } from 'express';
import { Genders } from '../models/genders';
import { UserCredential } from '../models/user-credential';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);

            return res.status(400).json({ error });
        }
    };
};

export const Schemas = {
    userProfile: {
        create: Joi.object<IUserProfile>({
            emailAddress: Joi.string().required().lowercase().email(),
            password: Joi.string().required(),
            lastName: Joi.string().required(),
            firstName: Joi.string().required(),
            birthDate: Joi.date().optional().less('now'),
            gender: Joi.string().valid(...Object.values(Genders))
        }),
        update: Joi.object<IUserProfile>({
            emailAddress: Joi.string().required().lowercase().email(),
            password: Joi.string().required(),
            lastName: Joi.string().required(),
            firstName: Joi.string().required(),
            birthDate: Joi.date().optional().less('now'),
            gender: Joi.string().valid(...Object.values(Genders))
        })
    },
    userCredential: {
        create: Joi.object<UserCredential>({
            emailAddress: Joi.string().required().lowercase().email(),
            password: Joi.string().required()
        }),
        update: Joi.object<UserCredential>({
            emailAddress: Joi.string().required().lowercase().email(),
            password: Joi.string().required()
        })
    }
};