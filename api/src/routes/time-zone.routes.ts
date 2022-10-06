import { RouteGuard } from './../middleware/auth';
import { Route } from 'tsoa';
import express from 'express';
import { Schemas, ValidateSchema, ValidateParamObjectId } from '../middleware/joi';
import { TimeZoneController } from '../controllers/time-zone.controller';

const router = express.Router();

router.get('/', RouteGuard.verifyToken, async (req, res, next) => {
    const controller = new TimeZoneController();

    try {
        const response = await controller.getTimeZones(req, res, next);

        if (response !== null) {
            return res.status(200).send(response);
        }
    } catch (error) {
        return res.status(500).json({ message: 'An exception has occurred' })
    }
});

router.get('/:id', RouteGuard.verifyToken, ValidateParamObjectId, async (req, res, next) => {
    const controller = new TimeZoneController();

    try {
        const response = await controller.getTimeZoneById(req, res, next);

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

export default router;