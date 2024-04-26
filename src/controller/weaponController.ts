import catchAsyncError from "../middlewere/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import User from "../model/userModel";
import { getSignedUrlForUpload, getSignedUrlsForUploadPreview } from "../utils/s3";
import Weapon from "../model/weaponModel";


export const addWeaponDetails = catchAsyncError(async (req, res, next) => {

    const weapon = await Weapon.create(req.body);
    res.status(200).json({ success: true, weapon });
});

export const uploadBanner = catchAsyncError(async (req, res, next) => {

    const { fileName, uuid } = req.body;
    const url = await getSignedUrlForUpload(fileName, uuid);
    res.status(200).json({ success: true, url });
})






