import { Document, model, Schema } from 'mongoose';
import { Genders } from './genders';
// import isEmail from 'validator';
import bcrypt from 'bcrypt';

export interface IUserProfile {
  emailAddress: string;
  password: string;
  hash: string;
  salt: string;
  lastName: string;
  firstName: string;
  birthDate?: Date;
  gender?: Genders;
}

export interface IUserProfileModel extends IUserProfile, Document { }

const userProfileSchema: Schema = new Schema<IUserProfile>({
  emailAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
    // ,validate: [isEmail, 'A valid email is required.']
  },
  password: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: false
  },
  salt: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: false
  },
  gender: {
    type: String,
    required: false,
    enum: Object.values(Genders), default: Genders.Unknown
  }
});

// Fire before the save event to hash the password 
userProfileSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static method to login user
userProfileSchema.statics.login = async function (emailAddress, password) {
  const user = await this.findOne({ emailAddress });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const UserProfile = model<IUserProfileModel>('UserProfile', userProfileSchema);
export default UserProfile;
