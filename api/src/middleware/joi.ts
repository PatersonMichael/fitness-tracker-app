import Joi, { ObjectSchema } from 'joi';
import Logging from '../lib/logging';
import { IUserProfile } from '../models/user-profile';
import { NextFunction, Request, Response } from 'express';
import { Genders } from '../models/genders';
import { UserCredential } from '../models/user-credential';

// Regex pattern for strong password
const strongPasswordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

// Regex for mongodb objectId
const objectIdRegex = new RegExp('^[0-9a-fA-F]{24}$');

export const ValidateSchema = (schema: ObjectSchema) => {
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
            gender: Joi.string().valid(...Object.values(Genders)),
            preferences: Joi.object({
                weightUnit: Joi.string().optional(),
                heightUnit: Joi.string().optional(),
                distanceUnit: Joi.string().optional(),
                energyUnit: Joi.string().optional(),
                temperatureUnit: Joi.string().optional(),
                waterUnit: Joi.string().optional(),
                activityLevel: Joi.string().optional(),
                timezone: Joi.string().optional()
            }).optional()
        }),
        update: Joi.object<IUserProfile>({
            emailAddress: Joi.string().required().lowercase().email().max(320),
            password: Joi.string().required().min(8).max(72).regex(strongPasswordRegex),
            lastName: Joi.string().required().max(30),
            firstName: Joi.string().required().max(30),
            birthDate: Joi.date().optional().less('now'),
            gender: Joi.string().valid(...Object.values(Genders)),
            preferences: Joi.object({
                weightUnit: Joi.string().optional(),
                heightUnit: Joi.string().optional(),
                distanceUnit: Joi.string().optional(),
                energyUnit: Joi.string().optional(),
                temperatureUnit: Joi.string().optional(),
                waterUnit: Joi.string().optional(),
                activityLevel: Joi.string().optional(),
                timezone: Joi.string().optional()
            }).optional()
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
};

export const ValidateParamObjectId = (req: Request, res: Response, next: NextFunction) => {
    const objectIdValue = req.params.id;

    const { value, error } = Joi.string().required().regex(objectIdRegex).validate(objectIdValue);
    if (error) {
        return res.status(400).json({ message: 'Invalid parameter value' });
    }

    next();
};
