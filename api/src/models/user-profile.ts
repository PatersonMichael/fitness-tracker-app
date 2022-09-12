import { Document, model, Schema } from 'mongoose';
import { Gender } from './gender';

export interface UserProfile {
  emailAddress: string;
  password: string;
  lastName: string;
  firstName: string;
  birthDate?: Date;
  gender?: Gender;
}

export interface IUserProfileModel extends UserProfile, Document { }

const userProfileSchema: Schema = new Schema<UserProfile>({
  emailAddress: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  birthDate: { type: Date, required: false },
  gender: { type: String, required: false, enum: Object.values(Gender), default: Gender.Unknown }
});

const UserProfile = model<IUserProfileModel>('UserProfile', userProfileSchema);
export default UserProfile;
