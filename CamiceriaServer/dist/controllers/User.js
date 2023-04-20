import mongoose from "mongoose";
import User from "../models/User.js";
const createUser = (req, res, next) => {
    const { username, cart } = req.body;
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username,
        cart,
    });
    return user
        .save()
        .then((user) => res.status(201).json({ user }))
        .catch((error) => res.status(500).json(error));
};
const readUser = (req, res, next) => {
    const userId = req.params.userId;
    return User.findById(userId)
        .then((user) => user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: "Not found" }))
        .catch((error) => res.status(500).json({ error }));
};
const readAllUser = (req, res, next) => {
    return User.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }));
};
const updateUser = (req, res, next) => {
    const userId = req.params.userId;
    return User.findById(userId)
        .then((user) => {
        if (user) {
            user.set(req.body);
            return user
                .save()
                .then((user) => res.status(201).json({ user }))
                .catch((error) => res.status(500).json(error));
        }
        else {
            res.status(404).json({ message: "Not found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    return User.findByIdAndDelete(userId)
        .then((user) => user
        ? res.status(201).json({ message: "Deleted" })
        : res.status(404).json({ message: "Not found" }))
        .catch((error) => res.status(500).json({ error }));
};
const addToCart = (req, res, next) => {
    const article = req.body;
    return User.findOneAndUpdate({ username: "FrancescoTotti" }, { $push: { "cart.customShirts": article } }, { upsert: true })
        .then(() => res.status(200).json({ message: "data updated", article: article }))
        .catch((error) => res.status(500).json({ error }));
};
const readAllCustomShirts = (req, res, next) => {
    return User.findOne({ username: "FrancescoTotti" })
        .then((customShirts) => res.status(200).json(customShirts))
        .catch((error) => res.status(500).json({ error }));
};
const removeFromCart = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    // return User.findOne({
    //   username: "FrancescoTotti","cart.customShirts._id":id},'cart.customShirts.$')
    User.updateOne({ username: "FrancescoTotti" }, { $pull: { "cart.customShirts": { "_id": id } } })
        .then((ris) => res.status(200).json({ message: "updated", ris }))
        .catch((error) => {
        res.status(500).send(error);
        console.log(error);
    });
    // const updated = await User.findOne({username:"FrancescoTotti"});
    // const array = updated?.cart.customShirts;
    // const newarray = array?.filter((item)=>item._id!== id);
    // newarray.save();
    // res.status(200).send(updated?.cart.customShirts);
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
