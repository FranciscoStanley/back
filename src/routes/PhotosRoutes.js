import { Router } from 'express';

import photosController from '../controllers/PhotosController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/upload', loginRequired, photosController.upload);
router.patch('/update', loginRequired, photosController.update);

export default router;
