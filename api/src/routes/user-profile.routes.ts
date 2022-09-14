import { Router } from 'express';
import { Schemas, ValidateJoi } from '../middleware/joi';
import { UserController, getUserProfiles, getUserProfileById, postUserProfile, putUserProfile, deleteUserProfile } from '../controllers/user-profiles.controller';

const router = Router();

// TODO: Convert this to follow the same pattern as the authentication router

router.get('/', getUserProfiles);
router.get('/:id', getUserProfileById);
router.post('/', ValidateJoi(Schemas.userProfile.create), postUserProfile);
router.put('/:id', ValidateJoi(Schemas.userProfile.update), putUserProfile);
router.delete('/:id', deleteUserProfile);

export default router;