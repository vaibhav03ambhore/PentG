import express from 'express';

//controller
import {createUser, loginUser, logoutUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile} from '../controllers/userController.js';

//middlewares
import {authenticate, authorizeAdmin} from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/').post(createUser).get(authenticate,authorizeAdmin, getAllUsers);
router.post('/auth',loginUser);
router.post('/logout',logoutUser);
router.route('/profile').get(authenticate,getCurrentUserProfile).put(authenticate,updateCurrentUserProfile);






export default router;