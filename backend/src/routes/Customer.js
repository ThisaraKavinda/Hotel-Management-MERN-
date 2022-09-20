import express, { Router } from 'express';

import { addCustomer, viewCustomers, getCustomer, editCustomer, deleteCustomer } from '../controllers/Customer.js';
import {catchAsync} from '../utils/catchAsync.js';

const router = express.Router();

router.post('/add',  catchAsync(addCustomer));
router.get('/allCustomers',  catchAsync(viewCustomers));
router.get('/getCustomer/:nic',  catchAsync(getCustomer));
router.post('/update/:id',  catchAsync(editCustomer));
router.get('/delete/:id',  catchAsync(deleteCustomer));

export default router;