import { Document } from 'mongoose';

export type TWeapon = Document & {
  name:string;
  crypto: string;
  code: string;
  price:string;
  banner: string;
}