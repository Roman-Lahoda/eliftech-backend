import Router from 'express';
import guard from '../../middlewares/guard.js';
import {
  createBank,
  updateBank,
  deleteBank,
  listBank,
} from '../../controllers/bank/index.js';
import {
  validateCreateBank,
  validateUpdateBank,
} from '../../middlewares/validateBank.js';

const router = new Router();

router.get('/', guard, listBank);
router.post('/create', guard, validateCreateBank, createBank);
router.put('/update/:id', guard, validateUpdateBank, updateBank);
router.delete('/delete/:id', guard, deleteBank);

export default router;
