import express from 'express'
import { Photo } from '../entity/Photo';

const indexRouter = express.Router();

indexRouter.get('/', async (req, res) => {
    try {
        const photos = await Photo.find({ relations: ['user']});
        res.send(photos);
    } catch (err) {
        res.status(404).send('error on find photos');
    }
});

// indexRouter.post("/", async (req, res) => {
//     try {
//       let photo = new Photo();
//       photo.url = req.body.url;
  
//       await photo.save();
//       res.send(`Photo ${photo.url} has been added to db! with ${photo.id} id`);
//     } catch (e) {
//       res.status(404).send("error on add p");
//     }
//   });

export default indexRouter;