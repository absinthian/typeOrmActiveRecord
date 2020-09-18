import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import favicon from "serve-favicon";
import indexRouter from './routes/index.route';
import userRouter from './routes/user.route';
import aboutRoute from './routes/about.route';

//typeOrm connection to db
createConnection().then(async () => { });

// Create a new express application instance
const app = express();
const PORT = 15000;

// Call middleware

// Enable cross-origin Requests
app.use(cors());
// secure app by setting various HTTP headers
app.use(helmet());
//Parses the client’s request from json into javascript objects
app.use(express.json());

app.use(favicon(__dirname + "/public/images/favicon.ico"));

//Set all routes from routes folder
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use('/about', aboutRoute);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
