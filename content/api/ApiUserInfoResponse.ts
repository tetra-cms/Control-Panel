export enum Roles {
    USER = "user",
    ADMIN = "admin"
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