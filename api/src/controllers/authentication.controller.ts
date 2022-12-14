import jwt from 'jsonwebtoken';
import Logging from '../lib/logging';
import UserProfile from '../models/user-profile';
import { Authentication } from './../models/authentication';
import { config } from '../config/config';
import { Controller, Post, Route, Tags } from 'tsoa';
import { NextFunction, Request, Response } from 'express';
import { UserCredential } from './../models/user-credential';

@Route('/api/authenticate')
@Tags('Authentication')
export class AuthenticationController extends Controller {
    //@Post('/')
    public async postAuthentication(req: Request, _res: Response, _next: NextFunction): Promise<Authentication | null> {
        const userCredential: UserCredential = req.body;

        try {
            const userProfile = await UserProfile.findByEmailAddress(userCredential.emailAddress);

            if (userProfile) {
                const isMatch = await userProfile.checkPassword(userCredential.password);

                if (isMatch) {

                    // Reference: https://github.com/auth0/node-jsonwebtoken#readme
                    const token = jwt.sign({
                        userProfileId: userProfile.id
                    }, config.crypto.passphrase, {
                        expiresIn: '1h'
                    });

                    let authentication: Authentication = {
                        token: token
                    };
                    
                    /* 
                    // Verify the token
                    const isVerified = jwt.verify(token, config.crypto.passphrase);
                    Logging.info(`The token verification is: ${JSON.stringify(isVerified)})`);
                    */

                    return authentication; 
                }
            }
        } catch (error) {
            // TODO: Catch/Handle errors returned from mongo schema validation, like 11000, unique violation.
            // Should be a 400 bad request if invalid, 209 if a conflict.
            Logging.error(error);
            throw error;
        }

        Logging.warning(`The user was not authenticated.`);
        return null;
    };
}
