import express from 'express';
import Logging from '../lib/logging';
import { AuthenticationController } from '../controllers/authentication.controller';
import  UserProfile, { IUserProfile}  from '../models/user-profile';

const router = express.Router();

router.post('/', async (req, res, _next) => {
    const controller = new AuthenticationController();
    const response = await controller.postAuthentication(req, res, _next);

    if (response !== null) {
        Logging.info(`The response in authentication router post is: ${response}`);
        
        //const userProfile: UserProfile = response;

        return res.status(200).send(response);
    }

    return res.status(404).json({ message: 'not found' });
});

export default router;