import express from 'express';
import { Schemas, ValidateJoi } from '../middleware/joi';
import { UserProfilesController, putUserProfile, deleteUserProfile } from '../controllers/user-profiles.controller';

const router = express.Router();

// TODO: Add authentication middleware

router.get('/', async (req, res, _next) => {
    const controller = new UserProfilesController();
    const response = await controller.getUserProfiles(req, res, _next);

    try {
        if (response !== null) {
            return res.status(200).send(response);
        }
    } catch (error) {
        return res.status(500).json({ message: 'An exception has occurred' })
    }
});

router.get('/:id', async (req, res, _next) => {
    const controller = new UserProfilesController();
    const response = await controller.getUserProfileById(req, res, _next);

    try {
        if (response !== null) {
            return res.status(200).send(response);
        }
        else {
            return res.status(404).json({ message: 'not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'An exception has occurred' })
    }
});

router.post('/', ValidateJoi(Schemas.userProfile.create), async (req, res, _next) => {
    const controller = new UserProfilesController();
    const response = await controller.postUserProfile(req, res, _next);

    // TODO: Catch/Handle errors returned from mongo schema validation, like 11000, unique violation.
    // Should be a 400 bad request if invalid, 209 if a conflict.
    try {
        if (response !== null) {
            return res.status(201).send(response);
        }

    } catch (error) {
        return res.status(500).json({ message: 'An exception has occurred' })
    }
});

router.put('/:id', ValidateJoi(Schemas.userProfile.update), putUserProfile);

router.delete('/:id', deleteUserProfile);

export default router;