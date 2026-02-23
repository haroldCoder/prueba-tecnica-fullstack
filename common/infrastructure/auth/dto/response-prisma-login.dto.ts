export interface ResponsePrismaLoginDto {
    token: string;
    cookieExpires: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
    }
}