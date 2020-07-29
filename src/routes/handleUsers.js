import { Router } from 'express';
import { compare, genSalt, hash } from 'bcrypt';
import UserModel from '../models/users';

const env = process.env.NODE_ENV || 'development';

const router = Router();

if (env === 'development') {
  router.get('/users', async (req, res) => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (err) {
      res.status(500).send();
      res.json({ message: err });
    }
  });
}

router.post('/users/signin', async (req, res) => {
  const user = await UserModel.find({ username: req.body.username });
  if (!user.length) {
    res.send("User couldn't found");
  } else {
    try {
      if (await compare(req.body.password, user[0].password)) {
        res.send('Success');
      }
    } catch (error) {
      res.send(`An error occurred: ${error}`);
    }
  }
});

router.post('/users/signup', async (req, res) => {
  try {
    const generatedSalt = await genSalt();
    const password = await hash(req.body.password, generatedSalt);
    console.log(generatedSalt);
    console.log(password);
    const user = new UserModel({
      username: req.body.username,
      password,
    });

    const savedUser = await user.save();
    res.json(savedUser);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

export default router;
