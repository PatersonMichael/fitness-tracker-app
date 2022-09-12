import { NextFunction, Request, Response } from 'express';
import Logging from '../lib/logging';
import { Get, Post, Put, Delete, Route, Tags, Body, Path, Controller } from 'tsoa';

@Route('/api/healthcheck')
@Tags('HealthCheck')
export class HealthCheckController extends Controller { }

//@Get('/')
export async function getHealthCheck(req: Request, res: Response): Promise < Response < any, Record < string, any >>> {
    Logging.info(`In the getHealthCheck controller method.`);

    return res.status(200).json({
        servertime: new Date().toISOString(),
        status: 'Running'
    });
};

