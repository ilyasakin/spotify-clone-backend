const app = require("express");
const router = app.Router();
const bcrypt = require('bcrypt')
const userModel = require("../models/users.js");

const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

router.get('/users', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
      } catch (err) {
          res.status(500).send();
          res.json({ message: err });
      }
});

router.post('/users/signin', async (req, res) => {
    user = await userModel.find({ username: req.body.username });
    if (isEmpty(user)) {
        res.send('User couldn\'t found');
    } else {
        try {
            if (await bcrypt.compare(req.body.password, user[0].password)) {
                res.send('Success')
            }
        } catch {
            res.send('Err')
        }
    }
});

router.post('/users/signup', async (req, res) => {
    try {
        const generatedSalt = await bcrypt.genSalt();
        const password = await bcrypt.hash(req.body.password, generatedSalt)
        console.log(generatedSalt);
        console.log(password);
        const user = new userModel({
            username: req.body.username,
            password: password
        });

        savedUser = await user.save();
        res.json(savedUser)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
});

module.exports = router;
