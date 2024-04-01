export type TUser = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    isEmailVerified: boolean;
    password: string;
    avatar: string;
    domainName: string;
    twitterUsername: string;
    discordUsername: string;
    metamaskAddress: string;
    createdAt?: Date;
    updatedAt?: Date;
    isModified: (path: string) => boolean;
}
