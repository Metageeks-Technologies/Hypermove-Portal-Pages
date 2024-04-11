import express, { Request, Response } from 'express';
import { addToWaitingRoom, isUserInWaitingRoom } from '../controller/waitingRoom';
const waitingRoomRouter = express.Router();

waitingRoomRouter.route('/').post(addToWaitingRoom).get(isUserInWaitingRoom);

export default waitingRoomRouter;
