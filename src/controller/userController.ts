import catchAsyncError from "../middlewere/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import axios from "axios";
import User from "../model/userModel";
import { sendToken } from "../utils/sendToken";
const serverGeneratedState = "12345678";

export const getUserGoogle = catchAsyncError(async (req, res, next) => {

    if (req.body.hasOwnProperty("error")) {
        const { error_description } = req.body;
        return next(new ErrorHandler(error_description, 401));
    }

    console.log(req.body, "req.body");

    const { code, state } = req.body;
    if (serverGeneratedState !== state) {
        return next(new ErrorHandler("candidate is not authorized", 401));
    }

    const clientId = process.env.GOOGLE_CLIENT_ID || "";
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
    const callbackUrl = process.env.GOOGLE_CALLBACK_URL || "";
    let accessToken = "";
    try {
        const { data } = await axios.post(`https://oauth2.googleapis.com/token`, {
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: callbackUrl,
            grant_type: "authorization_code",
            access_type: "offline",
            prompt: "consent",
        });
        accessToken = data.access_token;
        console.log(data, "data by google");
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Error while getting accessToken", 400));
    }
    let response;
    try {
        const { data } = await axios.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        response = data;
        console.log(data, "data by google");
    } catch (err) {
        console.log(err);
        return next(new ErrorHandler("Error while getting userInfo", 400));
    }

    let user;
    const userObj = {
        email: response.email,
        firstName: response.given_name,
        lastName: response.family_name || ".",
        avatar: response.picture,
        isEmailVerified: response.verified_email,
    };

    user = await User.findOne({ email: response.email });
    if (!user) {
        user = await User.create(userObj);
    }
    await sendToken(user, 201, res, accessToken);
});

export const getUser = catchAsyncError(async (req, res, next) => {

    if (req.user) {

        return res.status(200).json({ user: req.user })
    }
    return next(new ErrorHandler("User not found", 404));
})

export const updateUser = catchAsyncError(async (req, res, next) => {

    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true, useFindAndModify: false });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({ user });
});




