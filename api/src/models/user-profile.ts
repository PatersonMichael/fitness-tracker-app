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
  preferences?: {
    weightUnit: string; // Pounds, Kilograms, Stone
    heightUnit: string; // Inches, Centimeters
    distanceUnit: string; // Miles, Kilometers
    energyUnit: string; // Calories, Kilocalories
    temperatureUnit: string; // Fahrenheit, Celsius
    waterUnit: string; // Cups, Fluid Ounces, Milliliters
    activityLevel: string; // Not Very Active, Lightly Active, Moderately Active, Very Active, Extremely Active
    timezone: string; // TODO: Find list of values. Pacific Time (Pacific Time (US & Canada))
  }
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
    default: Genders.Unknown,
  },
  preferences: {
    type: Object,
    required: false,
    weightUnit: {
      type: String,
      required: false
    },
    heightUnit: {
      type: String,
      required: false
    },
    distanceUnit: {
      type: String,
      required: false
    },
    energyUnit: {
      type: String,
      required: false
    },
    temperatureUnit: {
      type: String,
      required: false
    },
    waterUnit: {
      type: String,
      required: false
    },
    activityLevel: {
      type: String,
      required: false
    },
    timezone: {
      type: String,
      required: false
    }
  }
});

UserProfileSchema.methods.setPassword = async function (unhashedPassword: string) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(unhashedPassword, salt);
};

UserProfileSchema.methods.checkPassword = async function (unhashedPassword: string) {
  const result = await bcrypt.compare(unhashedPassword, this.password);
  return result;
};

UserProfileSchema.statics.findByEmailAddress = async function (emailAddress: string) {
  return await this.findOne({ emailAddress });
};

// // Fire before the save event to hash the password
// UserProfileSchema.pre('save', async function (next) {
//   console.log(`The pre save event about to fire.`)
//   await this.setPassword(this.password);
//   next();
// });

const UserProfile = mongoose.model<IUserProfileDocument, IUserProfileModel>(
  'UserProfile',
  UserProfileSchema,
);
export default UserProfile;
