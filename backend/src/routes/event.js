import express, { Router } from 'express';

import { addEvent, viewEvents, getEvent, editEvent, deleteEvent } from '../controllers/event.js';
import {catchAsync} from '../utils/catchAsync.js';

const router = express.Router();

router.post('/add',  catchAsync(addEvent));
router.get('/allEvents',  catchAsync(viewEvents));
router.get('/getEvent/:id',  catchAsync(getEvent));
router.post('/update/:id',  catchAsync(editEvent));
router.get('/delete/:id',  catchAsync(deleteEvent));

export default router;