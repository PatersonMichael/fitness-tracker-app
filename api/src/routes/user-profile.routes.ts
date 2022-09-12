import { Router } from 'express';
import { Schemas, ValidateJoi } from '../middleware/joi';
import { getUserProfiles, getUserProfileById, getUserProfileByEmailAddress, postUserProfile, putUserProfile, deleteUserProfile } from '../controllers/user-profiles.controller';

const router = Router();

router.get('/', getUserProfiles);
router.get('/:id', getUserProfileById);
router.get('/:emailaddress', getUserProfileByEmailAddress);
router.post('/', ValidateJoi(Schemas.userProfile.create), postUserProfile);
router.put('/:id', ValidateJoi(Schemas.userProfile.update), putUserProfile);
router.delete('/:id', deleteUserProfile);

export default router;