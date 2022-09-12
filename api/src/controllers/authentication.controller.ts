import CryptoJS from 'crypto-js';
import { config } from '../config/config';
import { Request, Response, NextFunction } from 'express';
import { Route, Tags, Controller, Post } from 'tsoa';
import UserProfile from '../models/user-profile';
import Logging from '../lib/logging';

@Route('/api/authenticate')
@Tags('Authentication')
export class AuthenticationController extends Controller {
    @Post('/')
    public async postAuthentication(req: Request, _res: Response, _next: NextFunction) {
        const { emailAddress, password } = req.body;
        const encryptedPassword = CryptoJS.AES.encrypt(password, config.crypto.passphrase);

        Logging.info(`In the authenticate method`);
        const decrypted = CryptoJS.AES.decrypt('U2FsdGVkX1+U2FsdGVkX19pziQgZavttwvfymWGmogvhx7SlYreTBBOO7ML/MRjzbhbvg0kwQP9', config.crypto.passphrase).toString(CryptoJS.enc.Utf8);
        Logging.info(`The decrypted value is: ${decrypted}`);

        Logging.info(`The emailAddress is ${emailAddress}`);
        Logging.info(`The password is ${password}`);
        Logging.info(`The encrypted value is: ${encryptedPassword}`);

        const promise = UserProfile
            .find()
            .where('emailAddress').equals(emailAddress)
            //.where('password').equals(decrypted)
            .exec();

        const userProfile = await promise;

        if (userProfile) {
            //const decrypted = CryptoJS.AES.decrypt(userProfile.password, config.crypto.passphrase).toString(CryptoJS.enc.Utf8);

            Logging.info(userProfile);
        }
        return userProfile

        // return UserProfile
        //     .find({ emailAddress: emailAddress })
        //     .then((userProfile) => {
        //         if (userProfile) {
        //             const decrypted = CryptoJS.AES.decrypt(userProfile.password, config.crypto.passphrase).toString(CryptoJS.enc.Utf8);
        //         }
        //         return userProfile;
        //     }).catch((error) => res.status(500).json({ error }));
    };
}