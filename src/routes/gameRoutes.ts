import express, { Request, Response } from 'express';
import { addGameDetails, uploadBanner, uploadPreview, getGameDetails } from '../controller/gameController';
const gameRouter = express.Router();

gameRouter.post('/', addGameDetails);
gameRouter.get('/:id',)
gameRouter.post('/s3/banner', uploadBanner);
gameRouter.post('/s3/preview', uploadPreview);

export default gameRouter;
