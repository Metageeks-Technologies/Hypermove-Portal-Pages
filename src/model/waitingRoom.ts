import mongoose, { Schema, Document } from 'mongoose';
import Tournament from './tournament';
import User from './userModel';

export type TWaitingRoom = Document & {
    tournament: Tournament;
    users: {
        userId: mongoose.Schema.Types.ObjectId;
        userWalletAddress: string;
    }[];
};

const WaitingRoomSchema: Schema = new Schema<TWaitingRoom>({

    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true,
    },
    users: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            userWalletAddress: {
                type: String,
                required: true,
            },
        }

    ],
});

const WaitingRoom = mongoose.model<TWaitingRoom>('WaitingRoom', WaitingRoomSchema);

export default WaitingRoom;