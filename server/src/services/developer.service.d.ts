export interface CreateDeveloperInput {
    name: string;
    email: string;
    role: string;
    bio?: string;
    githubUrl?: string;
}
export interface UpdateDeveloperInput {
    name?: string;
    email?: string;
    role?: string;
    bio?: string | null;
    githubUrl?: string | null;
}
export declare const createDeveloper: (data: CreateDeveloperInput) => Promise<{
    id: string;
    name: string;
    email: string;
    role: string;
    bio: string | null;
    githubUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getAllDevelopers: () => Promise<{
    id: string;
    name: string;
    email: string;
    role: string;
    bio: string | null;
    githubUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const getDeveloperById: (id: string) => Promise<{
    id: string;
    name: string;
    email: string;
    role: string;
    bio: string | null;
    githubUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export declare const updateDeveloper: (id: string, data: UpdateDeveloperInput) => Promise<{
    id: string;
    name: string;
    email: string;
    role: string;
    bio: string | null;
    githubUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const deleteDeveloper: (id: string) => Promise<{
    id: string;
    name: string;
    email: string;
    role: string;
    bio: string | null;
    githubUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=developer.service.d.ts.map