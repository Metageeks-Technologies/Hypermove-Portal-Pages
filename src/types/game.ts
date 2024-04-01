import { Document } from 'mongoose';

export type IGame = Document & {
    name: string;
    genre: string;
    releaseYear: number;
}