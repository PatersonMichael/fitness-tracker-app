import { Request, Response, NextFunction } from 'express';
import { Route, Tags, Controller, Get } from 'tsoa';
import TimeZone, { ITimeZone } from '../models/time-zone';
import Logging from '../lib/logging';

@Route('/api/timezone')
@Tags('TimeZone')
export class TimeZoneController extends Controller {
    //@Get('/')
    public async getTimeZones(_req: Request, _res: Response, _next: NextFunction): Promise<ITimeZone[] | null> {
        let TimeZones: ITimeZone[] = [];

        try {
            TimeZones = await TimeZone.find().exec();

            return TimeZones;
        } catch (error) {
            Logging.error(error);
            throw error;
        }
    }

    //@Get('/:id') 
    public async getTimeZoneById(req: Request, _res: Response, _next: NextFunction): Promise<ITimeZone | null> {
        const timeZoneId = req.params.id;

        try {
            const timeZone = await TimeZone.findById(timeZoneId).exec();

            return timeZone;
        } catch (error) {
            Logging.error(error);
            throw error;
        }
    }
}