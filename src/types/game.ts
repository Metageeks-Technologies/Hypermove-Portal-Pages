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
    banner: string;
    previewImages: string[];
}