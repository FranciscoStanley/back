import { Router } from 'express';
import studentController from '../controllers/StudentController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/create', studentController.create);
router.get('/', loginRequired, studentController.getAll);
router.get('/:id', loginRequired, studentController.getById);
router.patch('/update/:id', loginRequired, studentController.update);
router.delete('/delete/:id', loginRequired, studentController.delete);

export default router;
