import express from 'express';
import { AuthenticationController } from '../controllers/authentication.controller';

const router = express.Router();

router.post('/', async (req, res, _next) => {
    const controller = new AuthenticationController();
    const response = await controller.postAuthentication(req, res, _next);

    if (response) {
        return res.status(200).send(response);
    }

    return res.status(404).json({ message: 'not found' });
});

export default router;