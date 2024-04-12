import catchAsyncError from "../middlewere/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import Tournament from "../model/tournament";


export const createTournament = catchAsyncError(async (req, res, next) => {

    const tournament = await Tournament.create(req.body);
    res.status(200).json({ success: true, tournament });
});

export const getTournaments = catchAsyncError(async (req, res, next) => {

    const tournaments = await Tournament.find();
    res.status(200).json({ success: true, tournaments });
});

export const getTournament = catchAsyncError(async (req, res, next) => {

    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
        return next(new ErrorHandler('Tournament not found', 404));
    }
    res.status(200).json({ success: true, tournament });
});

export const getWinner = catchAsyncError(async (req, res, next) => {

    const { tournamentId, userId, userWalletAddress } = req.query;
    if (!tournamentId || !userId || !userWalletAddress) {
        return next(new ErrorHandler('Please provide tournamentId and userId', 400));
    }

    res.status(200).json({ success: true, message: `${userId} is winner` });
});

