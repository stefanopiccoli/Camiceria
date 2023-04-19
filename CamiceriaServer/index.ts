import express from "express";
// import { collar, cuff, fabric } from './src/models/model.js';
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import { Collar } from "./src/models/collar.js";
import { Fabric } from "./src/models/fabric.js";
import { Cuff } from "./src/models/cuff.js";
import { User } from "./src/models/user.js";
import { log } from "console";
import bodyParser from "body-parser";
import { router as collarRoute } from "./src/routes/collar.js";
import { router as fabricRoute } from "./src/routes/fabric.js";
import { router as cuffRoute } from "./src/routes/cuff.js";

const MONGO_URL =
  "mongodb+srv://stefano:stefano@cluster0.xksx1ho.mongodb.net/?retryWrites=true&w=majority";
const port = "1234";

mongoose.connect(MONGO_URL).then(() => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.listen(port, () => {
    console.log(`Server started! Listening on port ${port}`);
  });
  app.use("/api/v2/collar", collarRoute);
  app.use("/api/v2/fabric", fabricRoute);
  app.use("/api/v2/cuff", cuffRoute);

  app.post("/api/v2/addCustomShirtToCart", async (req, res) => {
    const product = req.body;
    // User.deleteMany({})
    // .then(()=> console.log('data deleted'))
    // .catch((error)=> console.log(error));

    // User.create({username: "FrancescoTotti"})
    // .then(()=> console.log('data created'))
    // .catch((error)=> console.log(error));

    User.findOneAndUpdate(
      { username: "FrancescoTotti" },
      { $push: { "cart.customShirts": product } },
      { upsert: true }
    )
      .then(() => console.log("data updated"))
      .catch((error) => console.log(error))
      .then(() => res.send("done"));
  });

  app.get("/api/v2/cart/customShirt", async (req, res) => {
    const ris = await User.findOne({ username: "FrancescoTotti" });
    // .catch((error)=> console.log(error))
    res.status(200).send(ris);
  });
});

// app.get('/api/v1/collars', (req,res) =>{
//     res.status(200).json(collar);
// });

// app.get('/api/v1/fabrics', (req,res) =>{
//     res.status(200).json(fabric);
// });

// app.get('/api/v1/cuffs', (req,res) =>{
//     res.status(200).json(cuff);
// });

// app.post('/api/v2/collaradd', async (req,res)=>{
//     await Fabric.create(fabric);
//     res.status(200);
// });
// {
//     collar: {
//       _id: '643d2066b3b795e5825e4a0a',
//       name: 'Classico',
//       buttons: 2,
//       __v: 0
//     },
//     fabric: { _id: '643ebcbcce023c25cd302332', name: 'Seta', color: [], __v: 0 },
//     cuff: {
//       _id: '643d224e195ef08e1a55945d',
//       name: 'Polso asola per gemello',
//       __v: 0
//     },
//     measure: { neck: 10, shoulder: 10, chest: 10, hips: 10, sleeve: 10 },
//     sign: { do: true, text: 'asdd', font: 'italic' }
//   }
