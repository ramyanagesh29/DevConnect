import type { Request, Response } from 'express';
export declare const createDeveloper: (req: Request, res: Response) => Promise<void>;
export declare const getAllDevelopers: (_req: Request, res: Response) => Promise<void>;
export declare const getDeveloperById: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
export declare const updateDeveloper: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
export declare const deleteDeveloper: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
//# sourceMappingURL=developer.controller.d.ts.map