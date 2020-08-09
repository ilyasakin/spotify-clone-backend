import { Router } from 'express';
// import { compare, genSalt, hash } from 'bcrypt';
import User from '../models/UsersSchema';
import auth from '../middleware/auth';

const env = process.env.NODE_ENV || 'development';

const router = Router();

if (env === 'development') {
  router.get('/users', async (_req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).send();
      res.json({ message: err });
    }
  });
}

// eslint-disable-next-line consistent-return
router.post('/users/signin', async (req, res) => {
  // Login a registered user
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/users/signup', async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get('/users/me', auth, async (req, res) => {
  // View logged in user profile
  res.send(req.user);
});

export default router;
