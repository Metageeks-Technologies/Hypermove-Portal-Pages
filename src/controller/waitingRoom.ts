import catchAsyncError from "../middlewere/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import Tournament from "../model/tournament";
import WaitingRoom from "../model/waitingRoom";
import User from "../model/userModel";


export const addToWaitingRoom = catchAsyncError(async (req, res, next) => {

    const { tournamentId, userId } = req.body;

    if (!tournamentId || !userId) {
        return next(new ErrorHandler('Please provide tournamentId and userId', 400));
    }
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
        return next(new ErrorHandler('Tournament not found', 404));
    }
    const waitingRoom = await WaitingRoom.findOne({ tournament: tournamentId });
    if (!waitingRoom) {
        const waitingRoom = await WaitingRoom.create({ tournament: tournamentId, users: [userId] });
        return res.status(200).json({ success: true, waitingRoom });
    }
    if (!waitingRoom.users.includes(userId)) {
        waitingRoom.users.push(userId);
        await waitingRoom.save();
    }

    res.status(200).json({ success: true, waitingRoom });
});

export const isUserInWaitingRoom = catchAsyncError(async (req, res, next) => {

    const { tournamentId, userId } = req.body;
    if (!tournamentId || !userId) {
        return next(new ErrorHandler('Please provide tournamentId and userId', 400));
    }
    const waitingRoom = await WaitingRoom.findOne({ tournament: tournamentId });
    if (!waitingRoom) {
        return res.status(200).json({ success: true, isUserInWaitingRoom: false });
    }
    if (!waitingRoom.users.includes(userId)) {
        return res.status(200).json({ success: true, isUserInWaitingRoom: false });
    }
    res.status(200).json({ success: true, isUserInWaitingRoom: true });
});


