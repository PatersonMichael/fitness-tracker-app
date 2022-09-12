import Joi, { ObjectSchema } from 'joi';
import Logging from '../lib/logging';
import { UserProfile } from '../models/user-profile';
import { NextFunction, Request, Response } from 'express';
import { Gender } from '../models/gender';

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
        create: Joi.object<UserProfile>({
            emailAddress: Joi.string().required(),
            password: Joi.string().required(),
            lastName: Joi.string().required(),
            firstName: Joi.string().required(),
            birthDate: Joi.date().optional(),
            gender: Joi.string().valid(...Object.values(Gender))
        }),
        update: Joi.object<UserProfile>({
            
            emailAddress: Joi.string().required(),
            password: Joi.string().required(),
            lastName: Joi.string().required(),
            firstName: Joi.string().required(),
            birthDate: Joi.date().optional(),
            gender: Joi.string().valid(...Object.values(Gender))
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