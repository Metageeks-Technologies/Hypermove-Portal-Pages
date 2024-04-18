import catchAsyncError from "../middlewere/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import Tournament from "../model/tournament";
import { sendTransaction } from "../utils/web3Methods";
import type { TParticipants } from "../types/tournaments";

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

export const updateTournament = catchAsyncError(async (req, res, next) => {


    const { tournamentData, id } = req.body;

    let tournament = await Tournament.findById(id);
    if (!tournament) {
        return next(new ErrorHandler('Tournament not found', 404));
    }

    tournament = await Tournament.findByIdAndUpdate(id, tournamentData, {
        new: true,
        runValidators: true,
    });

    if (!tournament) {
        return next(new ErrorHandler('Failed to update tournament', 500));
    }

    res.status(200).json({ success: true, tournament });


});

export const addWinners = catchAsyncError(async (req, res, next) => {

    type RequestBody = {
        participants: TParticipants[];
    }

    const { participants } = req.body as RequestBody;
    const tournamentId = req.params.id;
    if (participants.length === 0) {
        return next(new ErrorHandler('Please provide participants', 400));
    }
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
        return next(new ErrorHandler('Tournament not found', 404));
    }
    tournament.participants = participants;

    const savedTournament = await tournament.save();
    if (!savedTournament) {
        return next(new ErrorHandler('Failed to save winners', 500));
    };

    const playerAddresses = participants.map(participant => participant.walletAddress);

    const participantsData = participants.map(participant => {
        return {
            tournamentId: tournamentId,
            headshot: participant.headShot,
            kills: participant.kills,
            score: participant.userScore
        }
    });

    try {
        const hash = await sendTransaction(playerAddresses, participantsData);
        savedTournament.addParticipantsHash = hash;
        await savedTournament.save();

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }

    res.status(200).json({ success: true, message: 'Participants added successfully' });
});

