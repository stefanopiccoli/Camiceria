import express from 'express'
import controller from '../controllers/User.js'
import { adminCheck, decodeToken } from '../middlewares/Auth.js';

const router = express.Router();

router.post('/create',controller.createUser);
router.get('/get/:userId',controller.readUser);
router.get('/get/',controller.readAllUser);
router.patch('/update/:userId',controller.updateUser);
router.delete('/delete/:userId',controller.deleteUser);


// CART
router.use(decodeToken);
router.patch('/addToCart/',controller.addToCart);
router.get('/cart/customShirts/', controller.readAllCustomShirts);
router.patch('/cart/remove/:id', controller.removeFromCart);
// ORDER
router.get('/order/',controller.readAllOrders);
router.post('/order/create',controller.addToOrders);
router.get('/order/:idOrder');

router.use(adminCheck); //ADMIN 
router.get('/getRole',controller.getRoleUser);
router.get('/order/all', controller.readAllOrdersAdmin);

export default router;
