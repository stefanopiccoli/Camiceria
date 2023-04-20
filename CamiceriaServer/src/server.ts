import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import collarRoutes from './routes/Collar'
import fabricRoutes from './routes/Fabric'
import cuffRoutes from './routes/Cuff'
import userRoutes from './routes/User'
// import { Collar } fro./models/Collar.js.js";
// import { Fabric } from "./models/fabric.js";
// import { Cuff } from "./models/cuff.js";
// import { User } from "./models/user.js";
// import { error, log } from "console";
// import bodyParser from "body-parser";
// import { router as collarRoute } from "./routes/collar.js";
// import { router as fabricRoute } from "./routes/fabric.js";
// import { router as cuffRoute } from "./routes/cuff.js";
import { config } from "./config/config";

const app= express();

//CONNECT TO MONGO

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected to MongoDB");
    StartServer();
  })
  .catch((error) => {
    console.log("Unable to connect: ");
    console.log(error);
  });

const StartServer = () => {
  app.use(cors())
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

  // Routes
  app.use('/api/collars',collarRoutes);
  app.use('/api/fabrics',fabricRoutes);
  app.use('/api/cuffs',cuffRoutes);
  app.use('/api/users',userRoutes);

  // Healthcheck
  app.get('/ping', (req,res)=> res.status(200).json({message: 'pong'}));

  // Error handling
  app.use((req,res)=>{
    const error = new Error ('not found');
    return res.status(404).json({message: error.message});
  })

  http.createServer(app).listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}`));
  
  
  
}

// const app = express();
//   app.use(cors());
//   app.use(express.json());
//   app.listen(port, () => {
//     console.log(`Server started! Listening on port ${port}`);
//   });
//   app.use("/api/v2/collar", collarRoute);
//   app.use("/api/v2/fabric", fabricRoute);
//   app.use("/api/v2/cuff", cuffRoute);

//   app.post("/api/v2/addCustomShirtToCart", async (req, res) => {
//     const product = req.body;
//     // User.deleteMany({})
//     // .then(()=> console.log('data deleted'))
//     // .catch((error)=> console.log(error));

//     // User.create({username: "FrancescoTotti"})
//     // .then(()=> console.log('data created'))
//     // .catch((error)=> console.log(error));

//     User.findOneAndUpdate(
//       { username: "FrancescoTotti" },
//       { $push: { "cart.customShirts": product } },
//       { upsert: true }
//     )
//       .then(() => console.log("data updated"))
//       .catch((error) => console.log(error))
//       .then(() => res.send("done"));
//   });

//   app.get("/api/v2/cart/customShirt", async (req, res) => {
//     const ris = await User.findOne({ username: "FrancescoTotti" });
//     // .catch((error)=> console.log(error))
//     res.status(200).send(ris);
//   });

//   app.delete("/api/v2/cart/remove/:id", async (req, res) => {
//     try {
//       const id = req.params.id;
//       console.log(id);

//       // await User.updateOne(
//       //   { username: "FrancescoTotti", cart: { customShirts: { _id: id } } },
//       //   { $pull: { cart: { customShirts: { _id: id } } } }
//       // );
//       const updated = await User.findOne({"cart.customShirts.$._id":id });
//       res.status(200).send(updated);
//     } catch (error) {
//       res.status(400).send(error);
//       console.log(error);
//     }
//   });

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
