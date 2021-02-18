import Express from 'express';
import MusicRoute from './Music.route';
import UsersRoute from './Users.route';

const router = Express.Router();

router.use('/music', MusicRoute);
router.use('/users', UsersRoute);

export default router;
