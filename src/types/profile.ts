import { Document } from "mongoose";

type SocialMedia = {
  platform: string;
  link: string;
}

export type Tprofile = Document & {
  name: string;
  uuid: string;
  category: string;
  price: string;
  socialMedia: SocialMedia[];
  description: string;
  banner: string;
}