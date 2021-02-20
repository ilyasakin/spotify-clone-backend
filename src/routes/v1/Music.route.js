import { Router } from 'express';
import auth from '../../middleware/auth';
import musicController from '../../controllers/music.controller';

const router = Router();

router.get('/liked-songs', auth, musicController.getLiked);

router.get('/search/:query', auth, musicController.search);

router.get('/', auth, musicController.getAll);

router.get('/length', auth, musicController.getCount);

router.get('/:id', musicController.getById);

router.delete('/:id', auth, musicController.deleteById);

router.post('/update', auth, musicController.update);

router.post('/new', auth, musicController.create);

export default router;
