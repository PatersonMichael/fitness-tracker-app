import express from 'express';
import { HealthCheckController } from '../controllers/health-check.controller';

const router = express.Router();

router.get('/', async (_req, res, _next) => {
    const controller = new HealthCheckController();
    const response = await controller.getHealthCheck(_req, res, _next);
    return res.status(200).send(response);
});

export default router;