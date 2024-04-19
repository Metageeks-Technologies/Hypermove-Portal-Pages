import mongoose, { Schema, Document } from "mongoose";
import { Tprofile } from "../types/profile";

const profileSchema: Schema = new Schema({
  name: {type: String, required:true},
  uuid: { type: String, required: true },
  price: { type: String, required: true },
  category: [{ type: String, required: true }],
  socialMedia: [
    {
        platform: { type: String, required: true },
        link: { type: String, required: true }
    }
  ],
  description: { type: String, required: true },
  banner: { type: String, required: true },
});

const profileModel = mongoose.model<Tprofile>('Profile', profileSchema);
export default profileModel;