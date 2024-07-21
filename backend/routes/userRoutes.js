import express from 'express';

//controller
import {createUser, loginUser, logoutUser, getCurrentUserProfile, getAllUsers, updateCurrentUserProfile, getUserById,getUsernameById} from '../controllers/userController.js';

//middlewares
import {authenticate, authorizeAdmin} from '../middleware/authMiddleware.js';
import {upload} from '../middleware/multer.middleware.js';

const router = express.Router();

router.route('/').post(createUser).get(authenticate,authorizeAdmin, getAllUsers);
router.post('/auth',loginUser);
router.post('/logout',logoutUser);
router.get('/:id/profile',authenticate,getUserById);
router.get(':id/username',authenticate,getUsernameById);
router.route('/profile').get(authenticate,getCurrentUserProfile).put(authenticate,upload.fields([
    {
        name: 'profilePicture',
        maxCount: 1
    }
]),updateCurrentUserProfile);



export default router;