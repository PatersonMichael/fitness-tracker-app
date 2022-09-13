import Joi, { ObjectSchema } from 'joi';
import Logging from '../lib/logging';
import  UserProfile, { IUserProfile}  from '../models/user-profile';
import { NextFunction, Request, Response } from 'express';
import { Genders } from '../models/genders';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);

            return res.status(422).json({ error });
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
    }/*,
    book: {
        create: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        }),
        update: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        })
    }*/
};