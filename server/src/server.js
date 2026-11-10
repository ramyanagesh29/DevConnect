import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import developerRoutes from './routes/developer.routes.js';
import authRoutes from './routes/auth.routes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.get('/', (_req, res) => {
    res.json({
        success: true,
        message: 'Welcome to DevConnect API!',
        data: {
            project: 'DevConnect',
            status: 'Backend is running',
        },
    });
});
app.get('/api/health', (_req, res) => {
    res.json({
        success: true,
        message: 'DevConnect backend is healthy',
        data: {
            status: 'OK',
        },
    });
});
// Developer routes
app.use('/api/developers', developerRoutes);
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
    console.log(`DevConnect server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map