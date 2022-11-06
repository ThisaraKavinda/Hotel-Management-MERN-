import express, { Router } from 'express';

import { addEvent, viewEvents, getEvent, editEvent, deleteEvent, getEventsForSelectedDateAndLocation, getEventsForSelectedLocation,
    getEventsForAMonth, getEventList } from '../controllers/event.js';
import {catchAsync} from '../utils/catchAsync.js';

const router = express.Router();

router.post('/add',  catchAsync(addEvent));
router.get('/allEvents',  catchAsync(viewEvents));
router.get('/getEvent/:id',  catchAsync(getEvent));
router.get("/getEventsForSelectedDateAndLocation/:date/:location", catchAsync(getEventsForSelectedDateAndLocation));
router.get("/getEventsForSelectedLocation/:id", catchAsync(getEventsForSelectedLocation));
router.post('/update/:id',  catchAsync(editEvent));
router.get('/delete/:id',  catchAsync(deleteEvent));
router.get('/getEventsForAMonth/:month', catchAsync(getEventsForAMonth));
router.get('/getEventList', catchAsync(getEventList));

export default router;