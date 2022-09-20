import express, { Router } from 'express';

import { addRoom, viewRooms, getRoom, editRoom, deleteRoom } from '../controllers/room.js';
import {catchAsync} from '../utils/catchAsync.js';

const router = express.Router();

router.post('/add',  catchAsync(addRoom));
router.get('/allRooms',  catchAsync(viewRooms));
router.get('/getRoom/:id',  catchAsync(getRoom));
router.post('/update/:id',  catchAsync(editRoom));
router.get('/delete/:id',  catchAsync(deleteRoom));

export default router;