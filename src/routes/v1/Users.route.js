import { Router } from 'express';
import usersController from '../../controllers/users.controller';
import auth from '../../middleware/auth';

const env = process.env.NODE_ENV || 'development';

const router = Router();

if (env === 'development') {
  router.get('/', auth, usersController.getAll);
}

router.post('/signin', usersController.signIn);

router.post('/signup', usersController.signUp);

router.get('/me', auth, usersController.currentUser);

router.get('/myavatar', auth, usersController.getAvatar);

router.post('/logout', auth, usersController.logout);

router.post('/logoutall', auth, usersController.logoutAll);

router.delete('/delete', auth, usersController.deleteUser);

router.post('/likeSong', auth, usersController.like);

router.post('/unlikeSong', auth, usersController.unlike);

router.post('/isSongLiked', auth, usersController.isLiked);

export default router;
