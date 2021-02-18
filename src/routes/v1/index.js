import Express from 'express';
import MusicRoute from './Music.route';
import PlaylistRoute from './Playlist.route';
import UsersRoute from './Users.route';

const router = Express.Router();

router.use('/music', MusicRoute);
router.use('/users', UsersRoute);
router.use('/playlist', PlaylistRoute);

export default router;
