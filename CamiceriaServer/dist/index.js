import express from 'express';
import { collar, cuff, fabric } from './src/models/model.js';
import cors from 'cors';
const app = express();
const port = "1234";
app.use(cors());
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
app.get('/api/v1/collars', (req, res) => {
    res.status(200).json(collar);
});
app.get('/api/v1/fabrics', (req, res) => {
    res.status(200).json(fabric);
});
app.get('/api/v1/cuffs', (req, res) => {
    res.status(200).json(cuff);
});
