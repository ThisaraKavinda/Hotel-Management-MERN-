import express, { Router } from 'express';

import { addfeedback, viewfeedback, getfeedback, editfeedback, deletefeedback, getFeedbacksOfAUser } from '../controllers/feedback.js';
import {catchAsync} from '../utils/catchAsync.js';

const router = express.Router();

router.post('/add',  catchAsync(addfeedback));
router.get('/feedbacks',  catchAsync(viewfeedback));
router.get('/get/:id',  catchAsync(getfeedback));
router.post('/update/:id',  catchAsync(editfeedback));
router.get('/delete/:id',  catchAsync(deletefeedback));
router.get('/getFeedbacksOfAUser/:id',  catchAsync(getFeedbacksOfAUser));

export default router;