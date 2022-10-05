import axios from 'axios';
import { config } from '../config/config';
import { AuthenticationRequest, AuthenticationResponse } from '../models/types';

export class AuthService {
    public async authenticateUser(request: AuthenticationRequest): Promise<AuthenticationResponse | null> {        
        const path: string = `/api/authentication`;

        try {
            const { data, status } = await axios.post<AuthenticationResponse>(
                `${config.apiserver.url}${path}`,
                request,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                },
            );

            return data;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
            } else {
                console.log('unexpected error: ', error);
            }

            return null;
        }
    }
}
