import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import { error } from "console";

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { _id, username, cart } = req.body;
  const user = new User({
    _id,
    username,
    cart,
  });

  return user
    .save()
    .then((user) => res.status(201).json({ user }))
    .catch((error) => {
      res.status(500).json(error);
      console.log(error);
    });
};
const readUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};
const readAllUser = (req: Request, res: Response, next: NextFunction) => {
  return User.find()
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(500).json({ error }));
};
const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  return User.findById(userId)
    .then((user) => {
      if (user) {
        user.set(req.body);
        return user
          .save()
          .then((user) => res.status(201).json({ user }))
          .catch((error) => res.status(500).json(error));
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findByIdAndDelete(userId)
    .then((user) =>
      user
        ? res.status(201).json({ message: "Deleted" })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const addToCart = (req: Request & { userId?: string }, res: Response, next: NextFunction) => {
  const userId = req.userId;
  console.log(userId);
  
  if (!userId)
  return res.status(401).json({message: "Unauthorized"})
  const article = req.body;
  return User.findOneAndUpdate(
    { _id: userId },
    { $push: { "cart.customShirts": article } }
  )
    .then(() =>
      res.status(200).json({ message: "data updated", article: article })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAllCustomShirts = (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  if (!userId)
  return res.status(401).json({message: "Unauthorized"})

  return User.findOne({ _id: userId })
    .then((customShirts) => res.status(200).json(customShirts))
    .catch((error) => res.status(500).json({ error }));
};

const removeFromCart = (req: Request & { userId?: string }, res: Response, next: NextFunction) => {
  const itemId = req.params.id;
  const userId = req.userId;
  if (!userId)
  return res.status(401).json({message: "Unauthorized"})

  User.updateOne(
    { _id: userId },
    { $pull: { "cart.customShirts": { _id: itemId } } }
  )

    .then((ris) => res.status(200).json({ message: "updated", ris }))
    .catch((error) => {
      res.status(500).send(error);
      console.log(error);
    });
};

export default {
  createUser,
  readUser,
  readAllUser,
  updateUser,
  deleteUser,
  addToCart,
  readAllCustomShirts,
  removeFromCart,
};
