import mongoose, { Schema, Document } from 'mongoose';
import { TWeapon } from '../types/weapon';

const weaponSchema: Schema = new Schema({
    name: { type: String, required:true },
    crypto: { type: String, required:true },
    code: { type: String, required:true },
    price: { type: String, required:true },
    banner: { type: String, required: true },
});

const weaponModel = mongoose.model<TWeapon>('Weapon', weaponSchema);

export default weaponModel;