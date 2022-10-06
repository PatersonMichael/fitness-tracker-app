import authenticationRoutes from './routes/authentication.routes';
import express, { Request, Response } from 'express';
import healthCheckRoutes from './routes/health-check.routes';
import Logging from './lib/logging';
import mongoose from 'mongoose';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import timeZoneRoutes from './routes/time-zone.routes';
import userProfileRoutes from './routes/user-profile.routes';
import { config } from './config/config';

const app = express();

// Connect to Mongo
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        //Logging.info('Mongo connected successfully.');
        StartServer();
    })
    .catch((error) => Logging.error(error));

// Only Start Server if Mongoose Connects
const StartServer = (): void => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Configure the API
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, x-access-token, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    // Swagger Configuration
    app.use(express.static('public'));
    app.use(
        '/docs',
        swaggerUi.serve,
        swaggerUi.setup(undefined, {
            swaggerOptions: {
                url: '/swagger.json',
            },
        })
    );

    // Log every request to the console
    app.use(morgan('dev'));

    // Routes
    app.use('/api/healthcheck', healthCheckRoutes);
    app.use('/api/authentication', authenticationRoutes);
    app.use('/api/userprofiles', userProfileRoutes);
    app.use('/api/timezones', timeZoneRoutes);

    app.get('/', async(_req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({ 
            message: `Welcome to the API. Endpoints available at http://localhost:${config.server.port}/api` 
        });
    });

    // Error handling
    app.use((_req, res, _next) => {
        const error = new Error('Not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });

    app.listen(config.server.port, async () => {
        Logging.info(`Server is running on http://localhost:${config.server.port}`);
    });
};
