import express from 'express';

const router = express.Router();

// controllers
import { getAllPaintings, getSpecificPainting ,createPainting,updatePainting,deletePainting } from '../controllers/paintingController.js';

//middlewares
import { authenticate } from '../middleware/authMiddleware.js';
import checkId from '../middleware/checkId.js';

//public routes
router.get('/all-paintings',getAllPaintings);
router.get('/specific-painting/:id',checkId,getSpecificPainting);

//protected routes
router.post('/create-painting',authenticate,createPainting);
router.put('/update-painting/:id',authenticate,checkId,updatePainting);
router.delete('/delete-painting/:id',authenticate,checkId,deletePainting);

export default router;