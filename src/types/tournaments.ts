import { Document } from 'mongoose';

export type TParticipants = {
    position: number;
    userId: string;
    walletAddress: string;
    headShot: number;
    kills: number;
    userScore: number;
}

export type Tournament = Document & {
    map: string;
    tournamentId: string;
    gameType: string;
    scheduleType: 'daily' | 'weekly';
    matchDuration: number;
    goal: {
        target: number;
        targetOf: 'kills' | 'headshot';
    };
    reEntry: boolean;
    bonus: {
        amount: number;
        chain: number;
    };
    xpLevel: number;
    entryFee: {
        amount: number;
        currency: string;
    };
    participants: TParticipants[];
    players: number;
    startDate: Date;
    endDate: Date;
}