import express, { Router } from 'express';

import { 
    addPayment, viewPayments, getPaymentById, getPaymentsByReservation, editPayment, deletePayment, viewPaymentsOfACustomer,
    getPaymentsForAMonth, getPaymentList
} from '../controllers/payment.js';
import {catchAsync} from '../utils/catchAsync.js';

const router = express.Router();

router.post('/add',  catchAsync(addPayment));
router.get('/allPayments',  catchAsync(viewPayments));
router.get('/getPaymentById/:id',  catchAsync(getPaymentById));
router.get('/getPaymentsByReservation/:id',  catchAsync(getPaymentsByReservation));
router.post('/update/:id',  catchAsync(editPayment));
router.get('/delete/:id',  catchAsync(deletePayment));
router.get('/viewPaymentsOfACustomer/:id',  catchAsync(viewPaymentsOfACustomer));
router.get('/getPaymentsForAMonth/:month', catchAsync(getPaymentsForAMonth));
router.get('/getPaymentList', catchAsync(getPaymentList));

export default router;