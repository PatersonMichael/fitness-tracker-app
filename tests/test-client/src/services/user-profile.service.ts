import axios from 'axios';
import { config } from '../config/config';
import { CreateUserProfileRequest, CreateUserProfileResponse, GetUserProfileResponse, UpdateUserProfileRequest, UpdateUserProfileResponse } from '../models/types';

export class UserProfileService {

    public async getUserProfile(id: string): Promise<GetUserProfileResponse | null> {
        const path: string = `/api/userprofiles/${id}`;

        try {
            const { data, status } = await axios.get<GetUserProfileResponse>(
                `${config.apiserver.url}${path}`,
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

    public async createUserProfile(request: CreateUserProfileRequest): Promise<CreateUserProfileResponse | null> {
        const path: string = `/api/userprofiles`;

        try {
            const { data, status } = await axios.post<CreateUserProfileResponse>(
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

    public async updateUserProfile(id: string, request: UpdateUserProfileRequest): Promise<UpdateUserProfileResponse | null> {
        const path: string = `/api/userprofiles/${id}`;

        try {
            const { data, status } = await axios.put<UpdateUserProfileResponse>(
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

    public async deleteUserProfile(id: string): Promise<any> {
        const path: string = `/api/userprofiles/${id}`;

        try {
            const { data, status } = await axios.delete(
                `${config.apiserver.url}${path}`,
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

    public async getUserProfiles(): Promise<GetUserProfileResponse[] | null> {
        const path: string = `/api/userprofiles`;

        try {
            const { data, status } = await axios.get<GetUserProfileResponse[]>(
                `${config.apiserver.url}${path}`,
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