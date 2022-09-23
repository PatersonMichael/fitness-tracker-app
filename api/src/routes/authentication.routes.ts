import express from 'express';
import { Schemas, ValidateJoi } from '../middleware/joi';
import { AuthenticationController } from '../controllers/authentication.controller';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.userCredential.create), async (req, res, _next) => {
    const controller = new AuthenticationController();
    const response = await controller.postAuthentication(req, res, _next);

    try {
        if (response !== null) {
            return res.status(200).send(response);
        }

        return res.status(401).json({ message: 'Unauthorized' });
    } catch (error) {
        return res.status(500).json({ message: 'An exception has occurred' })
    }
});

export default router;