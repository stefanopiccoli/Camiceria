import express from 'express'
import { Collar } from '../models/collar.js';

export const router = express.Router();

router.get('/', async (req,res)=>{
  const collars = await Collar.find();
  res.status(200).json(collars);
});