import { Router } from 'express';
import { compare, genSalt, hash } from 'bcrypt';
import UserModel from '../models/users';

const router = Router();

const isEmpty = (obj) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

router.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).send();
    res.json({ message: err });
  }
});

router.post('/users/signin', async (req, res) => {
  const user = await UserModel.find({ username: req.body.username });
  if (isEmpty(user)) {
    res.send("User couldn't found");
  } else {
    try {
      if (await compare(req.body.password, user[0].password)) {
        res.send('Success');
      }
    } catch {
      res.send('Err');
    }
  }
});

router.post('/users/signup', async (req, res) => {
  try {
    const generatedSalt = await genSalt();
    const password = await hash(req.body.password, generatedSalt);
    // eslint-disable-next-line no-console
    console.log(generatedSalt);
    // eslint-disable-next-line no-console
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
