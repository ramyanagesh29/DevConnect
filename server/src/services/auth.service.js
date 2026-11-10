import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database.js';
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is missing in environment variables');
}
// Register a new user
export const registerUser = async (name, email, password) => {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        const error = new Error('Email already exists');
        error.name = 'DuplicateEmailError';
        throw error;
    }
    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);
    // Save user in database
    const user = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash,
        },
    });
    // Generate JWT
    const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '1d' });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        },
        token,
    };
};
// Login existing user
export const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    // Compare entered password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }
    // Generate JWT
    const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '1d' });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        },
        token,
    };
};
//# sourceMappingURL=auth.service.js.map