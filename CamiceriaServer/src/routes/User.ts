import express from 'express'
import controller from '../controllers/User.js'

const router = express.Router();

router.post('/create',controller.createUser);
router.get('/get/:userId',controller.readUser);
router.get('/get/',controller.readAllUser);
router.patch('/update/:userId',controller.updateUser);
router.delete('/delete/:userId',controller.deleteUser);
router.patch('/addToCart/',controller.addToCart);
router.get('/cart/customShirts/:id', controller.readAllCustomShirts);
router.patch('/cart/remove/:id', controller.removeFromCart);

export default router;
