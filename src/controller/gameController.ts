import catchAsyncError from "../middlewere/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import User from "../model/userModel";


export const addGameDetails = catchAsyncError(async (req, res, next) => {


    res.status(200).json({ success: true, data: "this is my form" });
});
