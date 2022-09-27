import { RouteGuard } from './../middleware/auth';
import { Route } from 'tsoa';
import express from 'express';
import { Schemas, ValidateSchema, ValidateParamObjectId } from '../middleware/joi';
import { UserProfilesController } from '../controllers/user-profiles.controller';

const router = express.Router();

// TODO: Add authentication middleware

router.get('/', RouteGuard.verifyToken, async (req, res, next) => {
    const controller = new UserProfilesController();

    try {
        const response = await controller.getUserProfiles(req, res, next);

        if (response !== null) {
            return res.status(200).send(response);
        }
    } catch (error) {
        return res.status(500).json({ message: 'An exception has occurred' })
    }
});

router.get('/:id', RouteGuard.verifyToken, ValidateParamObjectId, async (req, res, next) => {
    const controller = new UserProfilesController();

    try {
        const response = await controller.getUserProfileById(req, res, next);

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

router.post('/', ValidateSchema(Schemas.userProfile.create), async (req, res, next) => {
    const controller = new UserProfilesController();

    // TODO: Catch/Handle errors returned from mongo schema validation, like 11000, unique violation.
    // Should be a 400 bad request if invalid, 209 if a conflict.
    try {
        const response = await controller.postUserProfile(req, res, next);

        if (response !== null) {
            return res.status(201).send(response);
        }
    } catch (error) {
        return res.status(500).json({ message: 'An exception has occurred' })
    }
});

router.put('/:id', RouteGuard.verifyToken, ValidateParamObjectId, ValidateSchema(Schemas.userProfile.update), async (req, res, next) => {
    const controller = new UserProfilesController();

    // TODO: Catch/Handle errors returned from mongo schema validation, like 11000, unique violation.
    // Should be a 400 bad request if invalid, 209 if a conflict.
    try {
        const response = await controller.putUserProfile(req, res, next);

        if (response !== null) {
            return res.status(200).send(response);
        }

    } catch (error) {
        return res.status(500).json({ message: 'An exception has occurred' })
    }
});

router.delete('/:id', RouteGuard.verifyToken, ValidateParamObjectId, async (req, res, next) => {
    const controller = new UserProfilesController();

    try {
        await controller.deleteUserProfile(req, res, next);

        return res.status(204).json({ message: 'Deleted' })
    } catch (error) {
        return res.status(500).json({ message: 'An exception has occurred' })
    }
});

export default router;