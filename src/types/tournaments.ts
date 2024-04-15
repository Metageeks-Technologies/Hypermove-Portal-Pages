import { Document } from 'mongoose';

export type TWinner = {
    position: number;
    winnerId: string;
    walletAddress: string;
    headShot: number;
    kills: number;
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
    winners: TWinner[];
    players: number;
    startDate: Date;
    endDate: Date;
    participants: string[];
}