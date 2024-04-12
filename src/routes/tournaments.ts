import express, { Request, Response } from 'express';
import { createTournament, getTournament, getTournaments, getWinner } from '../controller/tournamentController';
const tournamentRouter = express.Router();

tournamentRouter.route('/').post(createTournament).get(getTournaments);
tournamentRouter.get('/getDate', (req: Request, res: Response) => {
    const date = new Date();
    res.json({ date });
}
);
tournamentRouter.route('/getWinner').get(getWinner);
tournamentRouter.get('/:id', getTournament);


export default tournamentRouter;
