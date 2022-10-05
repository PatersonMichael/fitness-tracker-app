import bcrypt from 'bcrypt';
import Logging from '../lib/logging';
import mongoose from 'mongoose';
import UserProfile, { IUserProfile } from '../models/user-profile';
import { NextFunction, Request, Response } from 'express';
import { Get, Post, Put, Delete, Route, Tags, Body, Path, Controller, } from 'tsoa';

@Route('/api/userprofiles')
@Tags('UserProfile')
export class UserProfilesController extends Controller {
    //@Get('/')
    public async getUserProfiles(_req: Request, _res: Response, _next: NextFunction): Promise<IUserProfile[] | null> {
        let userProfiles: IUserProfile[] = [];

        try {
            userProfiles = await UserProfile.find().exec();

            return userProfiles;
        } catch (error) {
            Logging.error(error);
            throw error;
        }
    }

    //@Get('/:id') 
    public async getUserProfileById(req: Request, _res: Response, _next: NextFunction): Promise<IUserProfile | null> {
        const userProfileId = req.params.id;

        try {
            const userProfile = await UserProfile.findById(userProfileId).exec();

            return userProfile;
        } catch (error) {
            Logging.error(error);
            throw error;
        }
    }

    //@Post('/')
    public async postUserProfile(req: Request, _res: Response, _next: NextFunction): Promise<IUserProfile | null> {        
        let userProfile = new UserProfile({
            _id: new mongoose.Types.ObjectId(),
            emailAddress: req.body.emailAddress,
            password: await setPassword(req.body.password),
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            preferences : req.body.preferences
        });

        try {
            userProfile = await userProfile.save();

            return userProfile;
        } catch (error) {
            // TODO: Catch/Handle errors returned from mongo schema validation, like 11000, unique violation.
            // Should be a 400 bad request if invalid, 209 if a conflict.
            Logging.error(error);
            throw error;
        }
    }

    //@Put('/:id')    
    public async putUserProfile(req: Request, _res: Response, _next: NextFunction): Promise<IUserProfile | null> {
        const userProfileId = req.params.id;        

        let userProfile = new UserProfile({
            _id: userProfileId,
            emailAddress: req.body.emailAddress,
            password: await setPassword(req.body.password),
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            preferences : req.body.preferences
        });

        try {
            await userProfile
                .replaceOne({
                    _id: userProfileId,
                    emailAddress: req.body.emailAddress,
                    password: await setPassword(req.body.password),
                    lastName: req.body.lastName,
                    firstName: req.body.firstName,
                    birthDate: req.body.birthDate,
                    gender: req.body.gender,
                    preferences : req.body.preferences
                });

            return userProfile;
        } catch (error) {
            // TODO: Catch/Handle errors returned from mongo schema validation, like 11000, unique violation.
            // Should be a 400 bad request if invalid, 209 if a conflict.
            Logging.error(error);
            throw error;
        }
    };

    //@Delete('/:id')
    public async deleteUserProfile(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const userProfileId = req.params.id;

        try {
            await UserProfile.findByIdAndDelete(userProfileId).exec();

            return;
        } catch (error) {
            // TODO: Catch/Handle errors returned from mongo schema validation, like 11000, unique violation.
            // Should be a 400 bad request if invalid, 209 if a conflict.
            Logging.error(error);
            throw error;
        }
    };
}

async function setPassword(unhashedPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(unhashedPassword, salt);

    return password;
};
