import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";

//typeOrm connection to db
createConnection().then(async connection => {});

// Create a new express application instance
const app = express();

// Call midlewares

// Enable cross-origin Requests
app.use(cors());
// secure app by setting various HTTP headers
app.use(helmet());
//Parses the client’s request from json into javascript objects
app.use(bodyParser.json());

//   //Set all routes from routes folder
//   app.use("/", routes);

app.get("/", async (req, res) => {
  const users = await User.find();
  console.log(users);

  res.send(users);
});

app.post("/", async (req, res) => {
  let user = new User();
  user = req.body;
  //   user.firstName = req.body.firstName;
  //   user.lastName = req.body.lastName;
  //   user.age = req.body.age;
  //   user.phone = req.body.phone;
  await user.save();
  res.send(`User ${user.firstName} has been added to db!`);
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne(id);
    user.remove();
    res.status(201).send("user deleted");
  } catch (err) {
    res.status(404).send("error on delete");
  }
});

app.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne(req.params);
    res.send(user);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/:id", async (req, res) => {
  try {
    let user = await User.findOne(req.params);
    user.firstName = req.body.firstName !== user.firstName ? req.body.firstName : user.firstName;
    user.lastName = req.body.lastName !== user.firstName ? req.body.lastName : user.lastName;
    user.age = req.body.age !== user.age ? req.body.age : user.age;;
    user.phone = req.body.phone !== user.phone ? req.body.phone : user.phone;;
    user.save();

    res.send(user);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
