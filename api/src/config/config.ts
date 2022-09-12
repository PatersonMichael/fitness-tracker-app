import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME: string = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || '';
const MONGO_DB_NAME: string = process.env.MONGO_DB_NAME || '';
const MONGO_URL: string = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.ipyhc.mongodb.net/${MONGO_DB_NAME}`;

const SERVER_PORT: number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

const SECRET_PASSPHRASE: string = process.env.SECRET_PASSPHRASE || '';

export const config = {
    mongo: {
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    crypto: {
        passphrase: SECRET_PASSPHRASE
    }
};
