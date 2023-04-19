import express from 'express'
import { Cuff } from '../models/cuff.js';

export const router = express.Router();

router.get('/', async (req,res)=>{
  const cuffs = await Cuff.find();
  res.status(200).json(cuffs);
});