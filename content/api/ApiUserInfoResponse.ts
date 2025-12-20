export enum Roles {
    USER = "USER",
    ADMIN = "ADMIN"
}

export interface APIUserInfoRepsonse {
    id: number,
    username: string,
    email: string,
    role: Roles,
    createdAt: Date,
    regIp: string,
    lastLogin: Date
}