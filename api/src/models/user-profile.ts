import mongoose, { Document, Model, Schema } from 'mongoose';
import { Genders } from './genders';
import bcrypt from 'bcrypt';

export interface IUserProfile {
  emailAddress: string;
  password: string;
  lastName: string;
  firstName: string;
  birthDate?: Date;
  gender?: Genders;
}

interface IUserProfileDocument extends IUserProfile, Document {
  setPassword: (unhashedPassword: string) => Promise<void>;
  checkPassword: (unhashedPassword: string) => Promise<boolean>;
}

interface IUserProfileModel extends Model<IUserProfileDocument> {
  findByEmailAddress: (emailAddress: string) => Promise<IUserProfileDocument>;
}

const UserProfileSchema: Schema<IUserProfileDocument> = new Schema({
  emailAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    required: false,
    enum: Object.values(Genders),
    default: Genders[2],
  },
});

UserProfileSchema.methods.setPassword = async function (
  unhashedPassword: string,
) {
  // const hash = await bcrypt.hash(unhashedPassword, 10);
  // this.password = hash;

  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(unhashedPassword, salt);
};

UserProfileSchema.methods.checkPassword = async function (
  unhashedPassword: string,
) {
  const result = await bcrypt.compare(unhashedPassword, this.password);
  return result;
};

UserProfileSchema.statics.findByEmailAddress = async function (
  emailAddress: string,
) {
  return await this.findOne({ emailAddress });
};

// Fire before the save event to hash the password
UserProfileSchema.pre('save', async function (next) {
  await this.setPassword(this.password);
  next();
});

const UserProfile = mongoose.model<IUserProfileDocument, IUserProfileModel>(
  'UserProfile',
  UserProfileSchema,
);
export default UserProfile;
