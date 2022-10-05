export enum Genders {
    Male = 'Male',
    Female = 'Female',
    Unknown = 'Unknown'
}

Object.freeze(Genders);

export type AuthToken = {
    userProfileId: string | null;
    iat: number;
    exp: number;
};

export type AuthenticationRequest = {
    emailAddress: string;
    password: string
};

export type AuthenticationResponse = {
    token: string;
};

export type UserProfilePreferences = {
    weightUnit: string; // Pounds, Kilograms, Stone
    heightUnit: string; // Inches, Centimeters
    distanceUnit: string; // Miles, Kilometers
    energyUnit: string; // Calories, Kilocalories
    temperatureUnit: string; // Fahrenheit, Celsius
    waterUnit: string; // Cups, Fluid Ounces, Milliliters
    activityLevel: string; // Not Very Active, Lightly Active, Moderately Active, Very Active, Extremely Active
    timezone: string; // Pacific Time (Pacific Time (US & Canada))
};

export type GetUserProfileResponse = {
    _id: string;
    emailAddress: string;
    password: string;
    lastName: string;
    firstName: string;
    birthDate?: Date;
    gender?: Genders;
    preferences?: UserProfilePreferences
};

export type CreateUserProfileRequest = {
    emailAddress: string;
    password: string;
    lastName: string;
    firstName: string;
    birthDate?: Date;
    gender?: Genders;
    preferences?: UserProfilePreferences
};

export type CreateUserProfileResponse = {
    _id: string;
    emailAddress: string;
    password: string;
    lastName: string;
    firstName: string;
    birthDate?: Date;
    gender?: Genders;
    preferences?: UserProfilePreferences
};

export type UpdateUserProfileRequest = {
    emailAddress: string;
    password: string;
    lastName: string;
    firstName: string;
    birthDate?: Date;
    gender?: Genders;
    preferences?: UserProfilePreferences
};

export type UpdateUserProfileResponse = {
    _id: string;
    emailAddress: string;
    password: string;
    lastName: string;
    firstName: string;
    birthDate?: Date;
    gender?: Genders;
    preferences?: UserProfilePreferences
};
