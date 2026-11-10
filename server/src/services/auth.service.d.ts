export declare const registerUser: (name: string, email: string, password: string) => Promise<{
    user: {
        id: string;
        name: string;
        email: string;
        createdAt: Date;
    };
    token: string;
}>;
export declare const loginUser: (email: string, password: string) => Promise<{
    user: {
        id: string;
        name: string;
        email: string;
        createdAt: Date;
    };
    token: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map