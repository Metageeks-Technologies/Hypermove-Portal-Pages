import express, { Request, Response } from 'express';
import { createTournament, getTournament, getTournaments } from '../controller/tournamentController';
const tournamentRouter = express.Router();

tournamentRouter.route('/').post(createTournament).get(getTournaments);
tournamentRouter.get('/:id', getTournament);

export default tournamentRouter;
