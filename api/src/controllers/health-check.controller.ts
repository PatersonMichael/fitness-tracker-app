import { HealthCheck } from '../models/health-check';
import { Request, Response } from 'express';
import { Route, Tags, Controller } from 'tsoa';

@Route('/api/healthcheck')
@Tags('HealthCheck')
export class HealthCheckController extends Controller {

}

//@Get('/')
export async function getHealthCheck(req: Request, res: Response) {
    let healthCheck: HealthCheck = {
        serverTime: new Date().toISOString(),
        serverStatus: 'Running'
    }
    
    return res.status(200).send({
        healthCheck
    });
};
