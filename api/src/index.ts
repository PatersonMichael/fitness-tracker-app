import express, { } from 'express';
import Logging from './lib/logging';
import mongoose from 'mongoose';
import healthCheckRoutes from './routes/health-check.routes';
import userProfileRoutes from './routes/user-profile.routes';
import { config } from './config/config';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';

const app = express();

/** Connect to Mongo */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        //Logging.info('Mongo connected successfully.');
        StartServer();
    })
    .catch((error) => Logging.error(error));

/** Only Start Server if Mongoose Connects */
const StartServer = (): void => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    /** Swagger Configuration */
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

    /** Rules of our API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /*
    // Refer to https://www.youtube.com/watch?v=72_5_YuDCNA&list=TLPQMTAwOTIwMjIFEoJYR3Ts-g&index=2
    // Log the request 
    app.use((req, res, next) => {
        // Log the req
        Logging.info(`Incomming - METHOD: [${req.method}] - HOST: [${req.hostname}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            // Log the res
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });
    */
   
    // log every request to the console
    app.use(morgan('dev'));

    /** Routes */
    app.use('/api/healthcheck', healthCheckRoutes);
    app.use('/api/userprofiles', userProfileRoutes);

    /** Error handling */
    app.use((req, res, next) => {
        const error = new Error('Not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });

    //const server = http.createServer(app).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
    app.listen(config.server.port, async () => {
        Logging.info(`Server is running on port ${config.server.port}`);
    });
};
