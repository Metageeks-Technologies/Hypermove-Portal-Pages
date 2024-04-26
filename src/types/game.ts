import { Document } from 'mongoose';

type SocialMedia = {
    platform: string;
    link: string;
}

export type TGame = Document & {
    title: string;
    uuid: string;
    platform: string[];
    recommendedAge: number;
    developer: string;
    publisher: string;
    releaseDate: Date;
    socialMedia: SocialMedia[];
    overView: string;
    gameReview: string;
    osrequirement: string;
    minos: string;
    cpu: string;
    mincpu:string,
    hdd: string;
    minhdd:string,
    ram: string;
    minram:string,
    banner: string;
    previewImages: string[];
}