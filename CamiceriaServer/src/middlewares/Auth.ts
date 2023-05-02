import express, { Request, Response, NextFunction } from "express";
import firebase from "../config/firebase.js";
import User from "../models/User.js";
import { IUser } from "../models/User.js";

export const decodeToken = async (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
) => {
  var token;
  if (req.headers.authorization)
    token = req.headers.authorization.split(" ")[1];
  else return res.status(500).json({ message: "Token not found" });
  try {
    const decodeValue = await firebase.auth().verifyIdToken(token);
    if (decodeValue) {
      req.userId = decodeValue.uid;
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const adminCheck = async (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;

  await User.findOne({ _id: userId }, { role: 1 })
    .then((user)=>{
      console.log(user);
      console.log(user?.role);
      
      if (user?.role === "admin")
        next();
      else
        res.status(401).json({message: "Admin required"})
        
    })
    .catch((error) => res.status(500).json({ error }));
};
