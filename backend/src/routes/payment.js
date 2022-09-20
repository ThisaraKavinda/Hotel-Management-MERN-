import express, { Router } from 'express';

import { addPayment, viewPayments, getPaymentById, getPaymentsByReservation, editPayment, deletePayment } from '../controllers/payment.js';
import {catchAsync} from '../utils/catchAsync.js';

const router = express.Router();

router.post('/add',  catchAsync(addPayment));
router.get('/allPayments',  catchAsync(viewPayments));
router.get('/getPaymentById/:id',  catchAsync(getPaymentById));
router.get('/getPaymentsByReservation/:id',  catchAsync(getPaymentsByReservation));
router.post('/update/:id',  catchAsync(editPayment));
router.get('/delete/:id',  catchAsync(deletePayment));

export default router;