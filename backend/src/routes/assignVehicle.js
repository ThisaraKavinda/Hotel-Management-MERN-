import express, { Router } from 'express';

import { assignVehicle, viewAllAssignedVehicles, viewAssignedOfAVehicle, getAvaiableNotAssignedVehicles,
    getRidesForAMonth, getRideList } from '../controllers/assignVehicle.js';
import {catchAsync} from '../utils/catchAsync.js';

const router = express.Router();

router.post('/add',  catchAsync(assignVehicle));
router.get('/viewAllAssignedVehicles',  catchAsync(viewAllAssignedVehicles));
router.get('/viewAssignedOfAVehicle/:id',  catchAsync(viewAssignedOfAVehicle));
router.get('/getAvaiableNotAssignedVehicles/:date',  catchAsync(getAvaiableNotAssignedVehicles));
router.get('/getRidesForAMonth/:month', catchAsync(getRidesForAMonth));
router.get('/getRideList', catchAsync(getRideList));

export default router;