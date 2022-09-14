import mongoose from 'mongoose';
import UserProfile from '../models/user-profile';
import { NextFunction, Request, Response } from 'express';
import { Get, Post, Put, Delete, Route, Tags, Body, Path, Controller } from 'tsoa';
import Logging from '../lib/logging';

@Route('/api/userprofiles')
@Tags('UserProfile')
export class UserController extends Controller {
    // TODO: Move functions ino this class and refactor to follow pattern as in authentication controller/router
}

//@Get('/')
export async function getUserProfiles(_req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    return UserProfile
        .find()
        .then((userProfiles) => res.status(200).json({ userProfiles }))
        .catch((error) => res.status(500).json({ error }));
};

//@Get('/:id')
export async function getUserProfileById(req: Request<{ id: string }>, res: Response): Promise<Response<any, Record<string, any>>> {
    const userProfileId = req.params.id;

    return UserProfile
        .findById(userProfileId)
        .then((userProfile) => (userProfile ? res.status(200).json({ userProfile }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

//@Post('/')
export async function postUserProfile(req: Request, res: Response) {
    const { emailAddress, password, lastName, firstName, birthDate, gender } = req.body;

    const userProfile = new UserProfile({
        _id: new mongoose.Types.ObjectId(),
        emailAddress: emailAddress,
        password: password,
        lastName: lastName,
        firstName: firstName,
        birthDate: birthDate,
        gender: gender
    });

    // TODO: Catch/Handle errors returned from mongo schema validation, like 11000, unique violation. 
    // Should be a 400 bad request if missing, 209 if a conflict.
    return userProfile
        .save()
        .then((userProfile) => res.status(201).json({ userProfile }))
        .catch((error) => res.status(500).json({ error }));
};

//@Put('/:id')
export async function putUserProfile(req: Request<{ id: string }>, res: Response) {
    const userProfileId = req.params.id;

    return;
};

//@Delete('/:id')
export async function deleteUserProfile(req: Request<{ id: string }>, res: Response) {
    const userProfileId = req.params.id;

    return UserProfile.findByIdAndDelete(userProfileId)
        .then(() => (res.status(204).json({ message: 'Deleted' })))
        .catch((error) => res.status(500).json({ error }));
};
