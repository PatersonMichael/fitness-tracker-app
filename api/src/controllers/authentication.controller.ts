import { UserCredential } from './../models/user-credential';
import Logging from '../lib/logging';
import  UserProfile, { IUserProfile}  from '../models/user-profile';
import {
    Controller,
    Post,
    Route,
    Tags
} from 'tsoa';
import { NextFunction, Request, Response } from 'express';

@Route('/api/authenticate')
@Tags('Authentication')
export class AuthenticationController extends Controller {
    @Post('/')
    public async postAuthentication(req: Request, _res: Response, _next: NextFunction) {
        const userCredential: UserCredential = req.body;

        Logging.info(`The emailAddress is ${userCredential.emailAddress}`);
        Logging.info(`The password is ${userCredential.password}`);

        const promise = UserProfile
            .find()
            .where('emailAddress').equals(userCredential.emailAddress)
            //.where('password').equals(decrypted)
            .exec();

        const userProfile = await promise;

        if (userProfile) {
            //const decrypted = CryptoJS.AES.decrypt(userProfile.password, config.crypto.passphrase).toString(CryptoJS.enc.Utf8);
            Logging.info(userProfile);
        }
        return userProfile;
    };
}

// module.exports.login_post = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await UserProfile.login(email, password);
//         res.status(200).json({ user: user._id });
//     } catch (err) {
//         res.status(400).json({});
//     }
// }