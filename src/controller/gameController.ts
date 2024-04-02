import catchAsyncError from "../middlewere/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import User from "../model/userModel";
import { getSignedUrlForUpload, getSignedUrlsForUploadPreview } from "../utils/s3";
import Game from "../model/gameModel";


export const addGameDetails = catchAsyncError(async (req, res, next) => {

    const game = await Game.create(req.body);
    res.status(200).json({ success: true, game });
});

export const uploadBanner = catchAsyncError(async (req, res, next) => {

    const { fileName, uuid } = req.body;
    const url = await getSignedUrlForUpload(fileName, uuid);
    res.status(200).json({ success: true, url });
})

export const uploadPreview = catchAsyncError(async (req, res, next) => {

    const { fileNames, uuid } = req.body;
    const urls = await getSignedUrlsForUploadPreview(fileNames, uuid);
    res.status(200).json({ success: true, urls });
}
)
