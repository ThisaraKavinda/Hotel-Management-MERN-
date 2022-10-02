import express, { Router } from 'express';

import { addRoom, viewRooms, getRoom, editRoom, deleteRoom, getAvailableRooms, getSelectedTypeAvailableRooms, getSelectedRoomByCode } from '../controllers/room.js';
import {catchAsync} from '../utils/catchAsync.js';

const router = express.Router();

router.post('/add',  catchAsync(addRoom));
router.get('/allRooms',  catchAsync(viewRooms));
router.get('/getRoom/:id',  catchAsync(getRoom));
router.get('/getAvailableRooms',  catchAsync(getAvailableRooms));
router.get('/getSelectedTypeAvailableRooms/:type',  catchAsync(getSelectedTypeAvailableRooms));
router.get('/getSelectedRoomByCode/:name',  catchAsync(getSelectedRoomByCode));
router.post('/update/:id',  catchAsync(editRoom));
router.get('/delete/:id',  catchAsync(deleteRoom));

export default router;