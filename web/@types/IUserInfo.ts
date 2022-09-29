// currently unused

export interface IUserInfo {
  userid?: number;
  emailAddress: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface IUserInfoNoPass {
  userid?: number;
  emailAddress: string;
  password?: string;
  firstName: string;
  lastName: string;
}
