import { AuthService } from './services/auth.service';
import { AuthenticationRequest, CreateUserProfileRequest, CreateUserProfileResponse, UserProfilePreferences, Genders, UpdateUserProfileRequest, AuthToken } from './models/types';
import { UserProfileService } from './services/user-profile.service';
import { faker } from '@faker-js/faker';
import { LocalStorage } from 'node-localstorage';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export class Program {
  _localStorage = new LocalStorage('./scratch');
  _emailAddress: string = faker.internet.email().toLowerCase();
  _password: string = faker.internet.password(20, true, /[A-Z]/, 'aX12$');
  _userProfileId: string = '';

  public async main(): Promise<void> {
    console.log(`Starting main...`);

    // 1. Create a user profile
    // 2. Authenticate the user
    // 3. Get the user profile
    // 4. Update the user profile with userProfilePreferences
    // 5. Get the user profile - expect 400
    // 6. Delete the user profile
    // 7. Get all user profiles

    // Post UserProfile    
    await this.createUserProfile();

    // Authentication
    await this.authenticateUser();

    // Get UserProfile
    await this.getUserProfile();

    // Update UserProfile
    await this.updateUserProfile();

    // Get UserProfile
    await this.getUserProfile();

    // Delete UserProfile
    await this.deleteUserProfile();

    // Invalid Get UserProfile
    await this.getUserProfileWithInvalidIdShouldReturn400();

    // Get UserProfiles
    await this.getUserProfiles();

    console.log(`Ending main...`);
  }

  private async authenticateUser() {
    const authenticationRequest: AuthenticationRequest = {
      emailAddress: this._emailAddress,
      password: this._password
    };
    const authService: AuthService = new AuthService();
    const authenticationResponse = await authService.authenticateUser(authenticationRequest);

    console.log(`Here is your authenticationResponse: `);
    console.log(JSON.stringify(authenticationResponse, null, 4));

    this._localStorage.setItem('token', authenticationResponse?.token ?? '');
    const token: string = this._localStorage.getItem('token') ?? '';
    console.log(`Here is your token: ${token}`);

    // Setup axios default headers
    axios.defaults.headers.common['x-access-token'] = `${token}`;

    // Set the _userProfileId from the token values
    const tokenValues = <AuthToken>jwt.decode(token);
    this._userProfileId = tokenValues?.userProfileId ?? '';
  }

  private async getUserProfile() {
    const userProfileService = new UserProfileService();
    const getUserProfileResponse = await userProfileService.getUserProfile(this._userProfileId);
    console.log(`Here is your getUserProfileResponse: `);
    console.log(JSON.stringify(getUserProfileResponse, null, 4));
  }

  private async getUserProfiles() {
    const userProfileService = new UserProfileService();
    const getUserProfilesResponse = await userProfileService.getUserProfiles();
    console.log(`The count of getUserProfilesResponse is: ${getUserProfilesResponse?.length ?? 0}`);
    //console.log(JSON.stringify(getUserProfilesResponse, null, 4));
  }

  private async createUserProfile() {
    const createUserProfileRequest: CreateUserProfileRequest = {
      emailAddress: this._emailAddress,
      password: this._password,
      lastName: faker.name.lastName(),
      firstName: faker.name.firstName(),
      birthDate: faker.date.birthdate({ min: 18, max: 100, mode: 'age' }),
      gender: faker.name.sexType() === 'male' ? Genders.Male : Genders.Female
    };

    const userProfileService = new UserProfileService();
    const createUserProfileResponse = await userProfileService.createUserProfile(createUserProfileRequest);
    this._userProfileId = createUserProfileResponse?._id ?? '';
    console.log(`Here is your createUserProfileResponse: `);
    console.log(JSON.stringify(createUserProfileResponse, null, 4));
  }

  private async updateUserProfile() {
    const updateUserProfileRequest: UpdateUserProfileRequest = {
      emailAddress: this._emailAddress,
      password: faker.internet.password(20, true, /[A-Z]/, 'aX12$'),
      lastName: faker.name.lastName(),
      firstName: faker.name.firstName(),
      birthDate: faker.date.birthdate({ min: 18, max: 100, mode: 'age' }),
      gender: faker.name.sexType() === 'male' ? Genders.Male : Genders.Female,
      preferences: {
        weightUnit: 'pounds',
        heightUnit: 'inches',
        distanceUnit: 'miles',
        energyUnit: 'calories',
        temperatureUnit: 'fahrenheit',
        waterUnit: 'ounces',
        activityLevel: 'lightly active',
        timezone: 'Pacific Time (Pacific Time (US & Canada))'
      }
    };

    const userProfileService = new UserProfileService();
    const updateUserProfileResponse = await userProfileService.updateUserProfile(this._userProfileId, updateUserProfileRequest);
    console.log(`Here is your updateUserProfileResponse: `);
    console.log(JSON.stringify(updateUserProfileResponse, null, 4));
  }

  private async deleteUserProfile() {
    const userProfileService = new UserProfileService();
    await userProfileService.deleteUserProfile(this._userProfileId);
  }

  private async getUserProfileWithInvalidIdShouldReturn400() {
    const userProfileService = new UserProfileService();
    const getUserProfileResponse = await userProfileService.getUserProfile('some-invalid-id');    
  }
}

const program = new Program();
program.main();
