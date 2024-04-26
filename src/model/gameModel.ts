import mongoose, { Schema, Document } from 'mongoose';
import { TGame } from '../types/game';

const gameSchema: Schema = new Schema({
    title: { type: String, required: true },
    uuid: { type: String, required: true },
    platform: [{ type: String, required: true }],
    recommendedAge: { type: Number, required: true },
    developer: { type: String, required: true },
    publisher: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    socialMedia: [
        {
            platform: { type: String, required: true },
            link: { type: String, required: true }
        }
    ],
    overView: { type: String, required: true },
    gameReview: {type: String, required: true},
    osrequirement: {type: String, required: true},
    minos: {type: String, required: true},
    cpu: {type: String, required: true},
    mincpu: {type: String, required: true},
    hdd: {type: String, required: true},
    minhdd: {type: String, required: true},
    ram: {type: String, required: true},
    minram: {type: String, required: true},
    gpu: {type: String, required: true},
    mingpu: {type: String, required: true},
    banner: { type: String, required: true },
    previewImages: [{ type: String, required: true }],
});

const gameModel = mongoose.model<TGame>('Game', gameSchema);

export default gameModel;