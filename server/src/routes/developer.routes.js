import { Router } from 'express';
import { prisma } from '../config/database.js';
const router = Router();
// Create a new developer
router.post('/', async (req, res) => {
    try {
        const { name, email, role, bio, githubUrl } = req.body;
        if (!name || !email || !role) {
            return res.status(400).json({
                success: false,
                message: 'Name, email and role are required',
                data: null,
            });
        }
        const developer = await prisma.developer.create({
            data: {
                name,
                email,
                role,
                bio,
                githubUrl,
            },
        });
        return res.status(201).json({
            success: true,
            message: 'Developer created successfully',
            data: developer,
        });
    }
    catch (error) {
        console.error('Create developer error:', error);
        return res.status(500).json({
            success: false,
            message: 'Unable to create developer',
            data: null,
        });
    }
});
// Get all developers
router.get('/', async (_req, res) => {
    try {
        const developers = await prisma.developer.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return res.status(200).json({
            success: true,
            message: 'Developers retrieved successfully',
            data: developers,
        });
    }
    catch (error) {
        console.error('Get developers error:', error);
        return res.status(500).json({
            success: false,
            message: 'Unable to retrieve developers',
            data: null,
        });
    }
});
// Get a developer by ID
router.get('/:id', async (req, res) => {
    try {
        const developer = await prisma.developer.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!developer) {
            return res.status(404).json({
                success: false,
                message: 'Developer not found',
                data: null,
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Developer retrieved successfully',
            data: developer,
        });
    }
    catch (error) {
        console.error('Get developer error:', error);
        return res.status(500).json({
            success: false,
            message: 'Unable to retrieve developer',
            data: null,
        });
    }
});
export default router;
//# sourceMappingURL=developer.routes.js.map