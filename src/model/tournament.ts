import { Schema, model, Document } from 'mongoose';
import type { Tournament } from '../types/tournaments';

const tournamentSchema = new Schema<Tournament>({

    tournamentId: {
        type: String,
        required: true,
    },
    map: {
        type: String,
        required: true,
    },
    gameType: {
        type: String,
        required: true,
    },
    scheduleType: {
        type: String,
        enum: ['daily', 'weekly'],
        required: true,
    },
    matchDuration: {
        type: Number,
        required: true,
    },
    goal: {
        target: {
            type: Number,
            required: true,
        },
        targetOf: {
            type: String,
            enum: ['kills', 'headshot'],
        },
    },
    reEntry: {
        type: Boolean,
        required: true,
    },
    bonus: {
        amount: {
            type: Number,
            required: true,
        },
        chain: {
            type: String,
            required: true,
        }
    },
    xpLevel: {
        type: Number,
        required: true,
    },
    entryFee: {
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        }
    },
    players: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    participants: [
        {
            position: {
                type: Number,
                required: true,
                default: 1,
            },
            userId: {
                type: String,
                required: true,
            },
            walletAddress: {
                type: String,
                required: true,
            },
            headShot: {
                type: Number,
                required: true,
                default: 0,
            },
            kills: {
                type: Number,
                required: true,
                default: 0,
            },
            userScore: {
                type: Number,
                required: true,
                default: 0,
            }
        }
    ],

});

const Tournament = model<Tournament>('Tournament', tournamentSchema);

export default Tournament;