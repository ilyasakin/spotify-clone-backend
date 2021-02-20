import { Router } from 'express';
import usersController from '../../controllers/users.controller';
import auth from '../../middleware/auth';

const env = process.env.NODE_ENV || 'development';

const router = Router();

if (env === 'development') {
  router.get('/', auth, usersController.getAll);
}

router.post('/sign-in', usersController.signIn);

router.post('/sign-up', usersController.signUp);

router.get('/me', auth, usersController.currentUser);

router.get('/my-avatar', auth, usersController.getAvatar);

router.post('/logout', auth, usersController.logout);

router.post('/logout-all', auth, usersController.logoutAll);

router.delete('/delete', auth, usersController.deleteUser);

router.post('/like-song', auth, usersController.like);

router.post('/unlike-song', auth, usersController.unlike);

router.post('/is-song-liked', auth, usersController.isLiked);

export default router;
