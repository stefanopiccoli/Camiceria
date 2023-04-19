import express from 'express'
import { Fabric } from '../models/fabric.js';

export const router = express.Router();

router.get('/', async (req,res)=>{
  const fabrics = await Fabric.find();
  res.status(200).json(fabrics);
});