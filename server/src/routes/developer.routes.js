import { Router } from 'express';
import { createDeveloper, getAllDevelopers, getDeveloperById, updateDeveloper, deleteDeveloper, } from '../controllers/developer.controller.js';
const router = Router();
// Create developer
router.post('/', createDeveloper);
// Get all developers
router.get('/', getAllDevelopers);
// Get developer by ID
router.get('/:id', getDeveloperById);
// Update developer
router.patch('/:id', updateDeveloper);
// Delete developer
router.delete('/:id', deleteDeveloper);
export default router;
//# sourceMappingURL=developer.routes.js.map