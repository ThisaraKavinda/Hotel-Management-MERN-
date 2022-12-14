import express, { Router } from 'express';

import { addVehicle, viewVehicles, getVehicle, editVehicle, deleteVehicle, getVehicleByNumber } from '../controllers/vehicle.js';
import {catchAsync} from '../utils/catchAsync.js';

const router = express.Router();

router.post('/add',  catchAsync(addVehicle));
router.get('/allVehicles',  catchAsync(viewVehicles));
router.get('/getVehicle/:id',  catchAsync(getVehicle));
router.get('/getVehicleByNumber/:num',  catchAsync(getVehicleByNumber));
router.post('/update/:id',  catchAsync(editVehicle));
router.get('/delete/:id',  catchAsync(deleteVehicle));

export default router;