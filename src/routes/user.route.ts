import express from 'express';
const userRouter = express.Router();
import { User } from '../entity/User';
import { Photo } from '../entity/Photo';


userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({ relations: ["photos"] });
    res.send(users);
  } catch (err) {
    res.status(404).send('error on find');
  }
});

//acces this endpoint to add a user with photos attached
userRouter.post('/add', async (req, res) => {
  try {
    const p1: Photo = new Photo();
    p1.url = req.body.photos[0].url;
    await p1.save();

    const p2: Photo = new Photo();
    p2.url = req.body.photos[1].url;
    await p2.save();

    const user: User = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.age = req.body.age;
    user.phone = req.body.phone;
    user.photos = [p1, p2];
    await user.save();

    res.send('user saved!');
  } catch (error) {
    console.log(error.message);
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne(req.params, { relations: ['photos'] });
    if (!user) {
      res.status(404).send(`User with id: ${req.params.id} not found!`);
    }
    res.send(user);
  } catch (err) {
    console.error(err.message);
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne(id);
    await user.remove();
    res.status(201).send(`user ${user.firstName} deleted`);
  } catch (err) {
    res.status(404).send("error on delete");
  }
});

userRouter.post("/", async (req, res) => {
  try {
    let user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.age = req.body.age;
    user.phone = req.body.phone;

    await user.save();
    res.send(`User ${user.firstName} has been added to db! with ${user.id} id`);
  } catch (e) {
    res.status(404).send("error on add");
  }
});

userRouter.put("/:id", async (req, res) => {
  try {
    let user = await User.findOne(req.params);
    user.firstName = req.body.firstName !== user.firstName ? req.body.firstName : user.firstName;
    user.lastName = req.body.lastName !== user.firstName ? req.body.lastName : user.lastName;
    user.age = req.body.age !== user.age ? req.body.age : user.age;
    user.phone = req.body.phone !== user.phone ? req.body.phone : user.phone;
    await user.save();

    res.send(user);
  } catch (err) {
    console.error(err.message);
  }
});

export default userRouter;
