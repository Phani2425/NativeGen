import express from 'express'
import imageRouter from './images'
const router = express.Router();


router.use('/image', imageRouter);

export default router;