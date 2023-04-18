import express from 'express';
import { collar, cuff, fabric } from './src/models/model.js';
import cors from 'cors';
import mongoose, { mongo } from 'mongoose';
import { Collar } from './src/models/collar.js';  
import { Fabric } from './src/models/fabric.js';   
import { Cuff } from './src/models/cuff.js'; 

const app = express();
const port = "1234";


app.use(cors());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get('/api/v1/collars', (req,res) =>{
    res.status(200).json(collar);
});

app.get('/api/v1/fabrics', (req,res) =>{
    res.status(200).json(fabric);
});

app.get('/api/v1/cuffs', (req,res) =>{
    res.status(200).json(cuff);
});

const MONGO_URL = "mongodb+srv://stefano:stefano@cluster0.xksx1ho.mongodb.net/?retryWrites=true&w=majority"

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error : Error)=> console.log(error));


app.get('/api/v2/collar', async (req,res)=>{
    const collars = await Collar.find();
    res.status(200).send(collars);
});
app.get('/api/v2/fabric', async (req,res)=>{
    const collars = await Fabric.find();
    res.status(200).send(collars);
});
app.get('/api/v2/cuff', async (req,res)=>{
    const collars = await Cuff.find();
    res.status(200).send(collars);
});

// app.post('/api/v2/collaradd', async (req,res)=>{
//     await Fabric.create(fabric);
//     res.status(200);
// });
