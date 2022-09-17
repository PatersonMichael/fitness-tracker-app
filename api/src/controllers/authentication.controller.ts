import { Authentication } from './../models/authentication';
import { UserCredential } from './../models/user-credential';
import Logging from '../lib/logging';
import UserProfile from '../models/user-profile';
import { Controller, Post, Route, Tags } from 'tsoa';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

//@Route('/api/authenticate')
//@Tags('Authentication')
export class AuthenticationController extends Controller {
    //@Post('/')
    public async postAuthentication(req: Request, _res: Response, _next: NextFunction): Promise<Authentication | null> {
        const userCredential: UserCredential = req.body;

        const userProfile = await UserProfile.findByEmailAddress(userCredential.emailAddress);

        if (userProfile) {
            const isMatch = await userProfile.checkPassword(userCredential.password);

            if (isMatch) {
                
                // TODO: Determine good values to use. Reference: https://github.com/auth0/node-jsonwebtoken#readme
                const token = jwt.sign({
                    data: 'foobar'
                }, 'superdupersecret', {
                    expiresIn: '1h'
                });

                let authentication: Authentication = {
                    userProfileId: userProfile._id,
                    token: token
                };

                return authentication;
            }
        }

        Logging.warning(`The user was not authenticated.`);
        return null;
    };
}
