import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/create', userController.create);
router.get('/', loginRequired, userController.index);
router.get('/:id', loginRequired, userController.show);
router.patch('/update/:id', loginRequired, userController.update);
router.delete('/delete/:id', loginRequired, userController.delete);

export default router;
