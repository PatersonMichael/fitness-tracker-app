import bcrypt from 'bcrypt';
import Logging from '../lib/logging';
import mongoose from 'mongoose';
import UserProfile, { IUserProfile } from '../models/user-profile';
import { NextFunction, Request, Response } from 'express';
import {
  Get,
  Post,
  Put,
  Delete,
  Route,
  Tags,
  Body,
  Path,
  Controller,
} from 'tsoa';

@Route('/api/userprofiles')
@Tags('UserProfile')
export class UserProfilesController extends Controller {
  //@Get('/')
  public async getUserProfiles(
    _req: Request,
    _res: Response,
    _next: NextFunction,
  ): Promise<IUserProfile[] | null> {
    let userProfiles: IUserProfile[] = [];

    try {
      userProfiles = await UserProfile.find().exec();

      return userProfiles;
    } catch (error) {
      Logging.error(error);
      throw error;
    }

    return userProfiles;
  }

  //@Get('/:id')
  public async getUserProfileById(
    req: Request,
    _res: Response,
    _next: NextFunction,
  ): Promise<IUserProfile | null> {
    const userProfileId = req.params.id;

    try {
      const userProfile = await UserProfile.findById(userProfileId).exec();

      return userProfile;
    } catch (error) {
      Logging.error(error);
      throw error;
    }

    return null;
  }

  //@Post('/')
  public async postUserProfile(
    req: Request,
    _res: Response,
    _next: NextFunction,
  ): Promise<IUserProfile | null> {
    const { emailAddress, password, lastName, firstName, birthDate, gender } =
      req.body;

    let userProfile = new UserProfile({
      _id: new mongoose.Types.ObjectId(),
      emailAddress: emailAddress,
      password: await setPassword(password),
      lastName: lastName,
      firstName: firstName,
      birthDate: birthDate,
      gender: gender,
    });

    try {
      userProfile = await userProfile.save();

      return userProfile;
    } catch (error) {
      // TODO: Catch/Handle errors returned from mongo schema validation, like 11000, unique violation.
      // Should be a 400 bad request if invalid, 209 if a conflict.
      Logging.error(error);
      throw error;
    }

    return null;
  }

  //@Put('/:id')
  //public async putUserProfile(req: Request<{ id: string }>, res: Response, _next: NextFunction): Promise<IUserProfile | null> {
  public async putUserProfile(
    req: Request,
    _res: Response,
    _next: NextFunction,
  ): Promise<IUserProfile | null> {
    const userProfileId = req.params.id;
    const { emailAddress, password, lastName, firstName, birthDate, gender } =
      req.body;

    let userProfile = new UserProfile({
      _id: userProfileId,
      emailAddress: emailAddress,
      password: await setPassword(password),
      lastName: lastName,
      firstName: firstName,
      birthDate: birthDate,
      gender: gender,
    });

    try {
      await userProfile.replaceOne({
        _id: userProfileId,
        emailAddress: emailAddress,
        password: await setPassword(password),
        lastName: lastName,
        firstName: firstName,
        birthDate: birthDate,
        gender: gender,
      });

      return userProfile;
    } catch (error) {
      // TODO: Catch/Handle errors returned from mongo schema validation, like 11000, unique violation.
      // Should be a 400 bad request if invalid, 209 if a conflict.
      Logging.error(error);
      throw error;
    }

    return null;
  }

  //@Delete('/:id')
  public async deleteUserProfile(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    const userProfileId = req.params.id;

    try {
      await UserProfile.findByIdAndDelete(userProfileId).exec();

      return;
    } catch (error) {
      // TODO: Catch/Handle errors returned from mongo schema validation, like 11000, unique violation.
      // Should be a 400 bad request if invalid, 209 if a conflict.
      Logging.error(error);
      throw error;
    }
  }
}

async function setPassword(unhashedPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(unhashedPassword, salt);

  return password;
}
