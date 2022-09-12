import CryptoJS from 'crypto-js';
import mongoose from 'mongoose';
import UserProfile, { IUserProfile } from '../models/user-profile';
import { config } from '../config/config';
import { Gender } from '../models/gender';
import { NextFunction, Request, Response } from 'express';
import { Get, Post, Put, Delete, Route, Tags, Body, Path, Controller } from 'tsoa';

@Route('/api/userprofiles')
@Tags('UserProfile')
export class UserController extends Controller { 
    
}

//@Get('/')
export async function getUserProfiles(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const userProfile = new UserProfile({
        _id: new mongoose.Types.ObjectId(),
        emailAddress: '',
        encryptedPassword: '',
        lastName: '',
        firstName: '',
        birthDate: new Date(),
        gender: Gender.Male
    });

    let userProfiles: IUserProfile[];
    userProfiles = [userProfile];

    return res.status(200).send({
        userProfiles
    });
};

//@Get('/:id')
export async function getUserProfileById(req: Request<{ id: string }>, res: Response) {
    const userProfileId: number = parseInt(req?.params?.id);

    return;
};

//@Get('/:emailAddress')
export async function getUserProfileByEmailAddress(req: Request<{ emailAddress: string }>, res: Response) {
    return;
};

//@Post('/')
export async function postUserProfile(req: Request, res: Response) {
    const { emailAddress, password, lastName, firstName, birthDate, gender } = req.body;
    const encryptedPassword = CryptoJS.AES.encrypt(password, config.crypto.passphrase);

    console.log(`The encrypted value is: ${encryptedPassword}`);
    const userProfile = new UserProfile({
        _id: new mongoose.Types.ObjectId(),
        emailAddress: emailAddress,
        password: encryptedPassword,
        lastName: lastName,
        firstName: firstName,
        birthDate: birthDate,
        gender: gender
    });

    return userProfile
        .save()
        .then((userProfile) => res.status(201).json({ userProfile }))
        .catch((error) => res.status(500).json({ error }));
};

//@Put('/:id')
export async function putUserProfile(req: Request<{ id: string }>, res: Response) {
    const userProfileId: number = parseInt(req?.params?.id);
    return;
};

//@Delete('/:id')
export async function deleteUserProfile(req: Request<{ id: string }>, res: Response) {
    const userProfileId: number = parseInt(req?.params?.id);

};

function CreateUserProfile(): void {
    let userProfile: IUserProfile = new UserProfile({
        emailAddress: 'someone@example.org',
        password: CryptoJS.AES.encrypt('some$password123', config.crypto.passphrase),
        lastName: 'Smith',
        firstName: 'John',
        birthDate: new Date(1980, 4, 15),
        gender: Gender.Male
    });

    var decrypted = CryptoJS.AES.decrypt(userProfile.password, config.crypto.passphrase).toString(CryptoJS.enc.Utf8);

    //console.log(`The encrypted value is: ${userProfile.password}`);
    //console.log(`The decrypted value is: ${decrypted}`);
    //console.log('Hello world!');
}