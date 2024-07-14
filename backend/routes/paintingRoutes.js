import express from 'express';

const router = express.Router();

// controllers
import { getAllPaintingsToSell, getAllSoldPaintingsByCreator,getAllForSalePaintingsByCreator, getSpecificPainting ,createPainting,updatePainting,deletePainting } from '../controllers/paintingController.js';
import { upload } from '../middleware/multer.middleware.js';
//middlewares
import { authenticate } from '../middleware/authMiddleware.js';
import checkId from '../middleware/checkId.js';

//public routes
router.get('/all-paintings',getAllPaintingsToSell);
router.get('/all-sold-paintings/:id',checkId,getAllSoldPaintingsByCreator);
router.get('/all-to-sale-paintings/:id',checkId,getAllForSalePaintingsByCreator);
router.get('/specific-painting/:id',checkId,getSpecificPainting);

//protected routes
router.post('/create-painting',authenticate,upload.fields(
    [
        {
            name: 'image',
            maxCount: 1
        }
    ]
),createPainting);

router.put('/update-painting/:id',authenticate,checkId,upload.fields(
    [
        {
            name: 'image',
            maxCount: 1
        }
    ]
),updatePainting);

router.delete('/delete-painting/:id',authenticate,checkId,deletePainting);

export default router;