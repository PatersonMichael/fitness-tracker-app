export class UserProfileService {
  profileData; // field to pass user data into

  // Collect relevant data when instantiated
  constructor(data: any) {
    this.profileData = data;
  }

  authenticateUser() {
    // POSTs user email and password to API to auth user
  }

  createUser() {
    // POSTs a new user profile to API
  }

  getUser() {
    // GETs user data from API
  }

  updateUser() {
    // PUTs changed user data to the API to update user info
  }

  deleteUser() {
    // DELETEs user data from API
  }
}
