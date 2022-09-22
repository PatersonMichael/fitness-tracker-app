import express from 'express';
import { Schemas, ValidateJoi } from '../middleware/joi';
import { UserProfilesController, getUserProfiles, getUserProfileById, putUserProfile, deleteUserProfile } from '../controllers/user-profiles.controller';

const router = express.Router();

// TODO: Convert this to follow the same pattern as the authentication router
router.post('/', ValidateJoi(Schemas.userProfile.create), async (req, res, _next) => {
    const controller = new UserProfilesController();
    const response = await controller.postUserProfile(req, res, _next);

    if (response !== null) {
        return res.status(201).send(response);
    }
    
    return res.status(500).json({ message: 'An exception has occurred' });

    //return res.status(401).json({ message: 'Unauthorized' });
});

router.get('/', getUserProfiles);
router.get('/:id', getUserProfileById);
//router.post('/', ValidateJoi(Schemas.userProfile.create), postUserProfile);
router.put('/:id', ValidateJoi(Schemas.userProfile.update), putUserProfile);
router.delete('/:id', deleteUserProfile);

export default router;