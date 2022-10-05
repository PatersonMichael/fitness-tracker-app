import dotenv from 'dotenv';

dotenv.config();

const API_PROTOCOL: string = process.env.API_PROTOCOL || '';
const API_HOST: string = process.env.API_HOST || '';
const API_HOST_PORT: number = process.env.API_HOST_PORT ? Number(process.env.API_HOST_PORT) : 1337;
const API_URL: string = `${API_PROTOCOL}://${API_HOST}:${API_HOST_PORT}`;

const SECRET_PASSPHRASE: string = process.env.SECRET_PASSPHRASE || '';

export const config = {
    apiserver: {
        host: API_HOST,
        port: API_HOST_PORT,
        url: API_URL
    },
    crypto: {
        passphrase: SECRET_PASSPHRASE
    }
};
