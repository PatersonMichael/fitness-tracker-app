export interface IAuthContext {
  isAuthenticated: boolean;
  userProfileId: string | null;
  token: string | null;
  dispatch?: any;
}
