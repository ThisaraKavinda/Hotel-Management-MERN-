import express, { Router } from 'express';

import { 
    addTask, viewAllTasks, viewTasksOfAHouseKeeper, getAvailableHouseKeepers, getTasksForAMonth, getTasksList
} from '../controllers/assignedTaskHouseKeeper.js';
import {catchAsync} from '../utils/catchAsync.js';

const router = express.Router();

router.post('/add',  catchAsync(addTask));
router.get('/viewAllTasks',  catchAsync(viewAllTasks));
router.get('/viewTasksOfAHouseKeeper/:houseKeeperId',  catchAsync(viewTasksOfAHouseKeeper));
router.get('/getAvailableHouseKeepers/:date',  catchAsync(getAvailableHouseKeepers));
router.get('/getTasksForAMonth/:month', catchAsync(getTasksForAMonth));
router.get('/getTasksList', catchAsync(getTasksList));

export default router;