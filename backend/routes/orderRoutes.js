import express from 'express';
import {
    createOrder,
    getOrderById, 
    getUserOrders, 
    getUserSells,
    updateOrderToPaid, 
    updateOrderToDelivered 
} from '../controllers/orderController.js';

import { authenticate } from '../middleware/authMiddleware.js';
import checkId from '../middleware/checkId.js';

const router = express.Router();

router.route('/').post(authenticate,createOrder).get(authenticate,getUserOrders);
router.route('/sells').get(authenticate,getUserSells);
router.route('/:id').get(authenticate,checkId,getOrderById);
router.route('/:id/pay').put(authenticate,checkId,updateOrderToPaid);
router.route('/:id/deliver').put(authenticate,checkId,updateOrderToDelivered);

export default router;