import mongoose, { Schema, Document } from 'mongoose';
import Tournament from './tournament';
import User from './userModel';

type TWaitingRoom = Document & {
    tournament: Tournament;
    users: mongoose.Schema.Types.ObjectId[];
};

const WaitingRoomSchema: Schema = new Schema<TWaitingRoom>({

    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    ],
});

const WaitingRoom = mongoose.model<TWaitingRoom>('WaitingRoom', WaitingRoomSchema);

export default WaitingRoom;