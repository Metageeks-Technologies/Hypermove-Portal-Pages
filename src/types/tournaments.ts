import { Document } from 'mongoose';


export type Tournament = Document & {
    map: string;
    tournamentId: string;
    gameType: string;
    mathDuration: number;
    goal: {
        target: number;
        for: 'kills' | 'headshot';
    };
    bonus: {
        amount: number;
        chain: number;
    };
    xpLevel: number;
    entryFee: {
        amount: number;
        currency: string;
    };
    players: number;
    startDate: Date;
    endDate: Date;
    participants: string[];
}