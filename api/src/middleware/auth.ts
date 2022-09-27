import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { NextFunction, Request, Response } from 'express';

export class RouteGuard {    
    private static _headerTokenName: string = 'x-access-token';

    public static async verifyToken(req: Request, res: Response, next: NextFunction) {
        let token = <string>req.headers[RouteGuard._headerTokenName];

        if (!token) {
            return res.status(401).send({
                message: 'Unauthorized'
            });

            next();
        }

        jwt.verify(token, config.crypto.passphrase, (error, decoded) => {
            if (error) {
                return res.status(401).send({
                    message: 'Unauthorized'
                });
            }

            next();
        });
    };

    public static isInRole(role: string, req: Request, res: Response, next: NextFunction) {
        // TODO: Review this strategy: https://github.com/MichielDeMey/express-jwt-permissions
        
        return res.status(403).send({
            message: 'Forbidden'
        });

        next(); // 🤷‍♂️
    }
}
