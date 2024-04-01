import express, { Request, Response } from 'express';
import { addGameDetails } from '../controller/gameController';
const gameRouter = express.Router();

gameRouter.post('/', addGameDetails)

export default gameRouter;
