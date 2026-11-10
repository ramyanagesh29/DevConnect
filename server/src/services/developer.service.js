import { prisma } from '../config/database.js';
// Create developer
export const createDeveloper = async (data) => {
    return await prisma.developer.create({
        data,
    });
};
// Get all developers
export const getAllDevelopers = async () => {
    return await prisma.developer.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
};
// Get developer by ID
export const getDeveloperById = async (id) => {
    return await prisma.developer.findUnique({
        where: {
            id,
        },
    });
};
// Update developer
export const updateDeveloper = async (id, data) => {
    return await prisma.developer.update({
        where: {
            id,
        },
        data,
    });
};
// Delete developer
export const deleteDeveloper = async (id) => {
    return await prisma.developer.delete({
        where: {
            id,
        },
    });
};
//# sourceMappingURL=developer.service.js.map