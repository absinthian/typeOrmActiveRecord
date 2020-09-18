import express from 'express';

const aboutRoute = express.Router();

aboutRoute.get('/', (req, res) => {
    res.send('about the app...');
});

export default aboutRoute;