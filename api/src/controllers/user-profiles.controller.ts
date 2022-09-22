import mongoose from 'mongoose';
import UserProfile from '../models/user-profile';
import { NextFunction, Request, Response } from 'express';
import {
    Get,
    Post,
    Put,
    Delete,
    Route,
    Tags,
    Body,
    Path,
    Controller,
} from 'tsoa';
import Logging from '../lib/logging';
import bcrypt from 'bcrypt';

@Route('/api/userprofiles')
@Tags('UserProfile')
export class UserProfilesController extends Controller {
    //@Post('/')
    public async postUserProfile(req: Request, res: Response, _next: NextFunction) {
        const { emailAddress, password, lastName, firstName, birthDate, gender } = req.body;

        let userProfile = new UserProfile({
            _id: new mongoose.Types.ObjectId(),
            emailAddress: emailAddress,
            password: await setPassword(password),
            lastName: lastName,
            firstName: firstName,
            birthDate: birthDate,
            gender: gender
        });

        try {
            userProfile = await userProfile.save();

            return userProfile;
            /*
             return await userProfile
                .save()
                .then((userProfile) => res.status(201).json({ userProfile }))
                .catch((error) => res.status(500).json({ error })); 
            */

        } catch (error) {
            // TODO: Catch/Handle errors returned from mongo schema validation, like 11000, unique violation.
            // Should be a 400 bad request if invalid, 209 if a conflict.
        }

        return null;
    }
}

//@Get('/')
export async function getUserProfiles(
    _req: Request,
    res: Response,
): Promise<Response<any, Record<string, any>>> {
    return await UserProfile.find()
        .then((userProfiles) => res.status(200).json({ userProfiles }))
        .catch((error) => res.status(500).json({ error }));
}

//@Get('/:id')
export async function getUserProfileById(
    req: Request<{ id: string }>,
    res: Response,
): Promise<Response<any, Record<string, any>>> {
    const userProfileId = req.params.id;

    return await UserProfile.findById(userProfileId)
        .then((userProfile) =>
            userProfile
                ? res.status(200).json({ userProfile })
                : res.status(404).json({ message: 'not found' }),
        )
        .catch((error) => res.status(500).json({ error }));
}


//@Put('/:id')
export async function putUserProfile(
    req: Request<{ id: string }>,
    res: Response,
) {
    const userProfileId = req.params.id;
    const { emailAddress, password, lastName, firstName, birthDate, gender } =
        req.body;

    const userProfile = new UserProfile({
        _id: userProfileId,
        emailAddress: emailAddress,
        password: await setPassword(password),
        lastName: lastName,
        firstName: firstName,
        birthDate: birthDate,
        gender: gender
    });

    try {
        await userProfile
            .replaceOne({
                _id: userProfileId,
                emailAddress: emailAddress,
                password: await setPassword(password),
                lastName: lastName,
                firstName: firstName,
                birthDate: birthDate,
                gender: gender
            });

        return res.status(200).json({ userProfile });
    } catch (error) {
        res.status(500).json({ error });
    }
};

//@Delete('/:id')
export async function deleteUserProfile(
    req: Request<{ id: string }>,
    res: Response,
) {
    const userProfileId = req.params.id;

    return await UserProfile.findByIdAndDelete(userProfileId)
        .then(() => (res.status(204).json({ message: 'Deleted' })))
        .catch((error) => res.status(500).json({ error }));
};

async function setPassword(unhashedPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(unhashedPassword, salt);

    return password;
};