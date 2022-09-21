import Joi, { ObjectSchema } from 'joi';
import Logging from '../lib/logging';
import { IUserProfile } from '../models/user-profile';
import { NextFunction, Request, Response } from 'express';
import { Genders } from '../models/genders';
import { UserCredential } from '../models/user-credential';

// TODO: fix this to use as a Joi extension for validating mongo objectId
// export const objectId = Joi.extend((joi) => {
//     return {
//         type: 'objectId',
//         base: joi.string(),
//         validate(value, helpers) {
//             return Joi.alternatives(
//                 Joi.string().regex(/^[0-9a-fA-F]{24}$/),
//                 Joi.object().keys({
//                     id: Joi.any(),
//                     _bsontype: Joi.allow('ObjectId')
//                 })
//             );
//         },
//     }
// });


// Regex pattern for mongo objectId
const objectIdRegex = new RegExp('/^[a-f\d]{24}$/i');

// Regex pattern for strong password
const strongPasswordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

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
            emailAddress: Joi.string().required().lowercase().email().max(320),
            password: Joi.string().required().min(8).max(72).regex(strongPasswordRegex),
            lastName: Joi.string().required().max(30),
            firstName: Joi.string().required().max(30),
            birthDate: Joi.date().optional().less('now'),
            gender: Joi.string().valid(...Object.values(Genders))
        }),
        update: Joi.object<IUserProfile>({
            emailAddress: Joi.string().required().lowercase().email().max(320),
            password: Joi.string().required().min(8).max(72).regex(strongPasswordRegex),
            lastName: Joi.string().required().max(30),
            firstName: Joi.string().required().max(30),
            birthDate: Joi.date().optional().less('now'),
            gender: Joi.string().valid(...Object.values(Genders))
        })
    },
    userCredential: {
        create: Joi.object<UserCredential>({
            emailAddress: Joi.string().required().lowercase().email().max(320),
            password: Joi.string().required().max(72)
        }),
        update: Joi.object<UserCredential>({
            emailAddress: Joi.string().required().lowercase().email().max(320),
            password: Joi.string().required().max(72)
        })
    }
}
