import { HealthCheck } from '../models/health-check';
import { Request, Response, NextFunction } from 'express';
import { Route, Tags, Controller, Get } from 'tsoa';

@Route('/api/healthcheck')
@Tags('HealthCheck')
export class HealthCheckController extends Controller {
    @Get('/')
    public async getHealthCheck(_req: Request, _res: Response, _next: NextFunction): Promise<HealthCheck> {
        const healthCheck: HealthCheck = {
            serverTime: new Date().toISOString(),
            serverStatus: 'Running'
        }

        return healthCheck;
    };
}

/*
//@Get('/')
export async function getHealthCheck(_req: Request, res: Response) {
    let healthCheck: HealthCheck = {
        serverTime: new Date().toISOString(),
        serverStatus: 'Running'
    }

    return res.status(200).send({
        healthCheck
    });
};
*/
