import express from 'express'
import controller from '../controllers/Cuff.js'
import { adminCheck, decodeToken } from '../middlewares/Auth.js';

const router = express.Router();

router.get('/get/:cuffId',controller.readCuff);
router.get('/get/',controller.readAllCuff);
router.use(decodeToken);
router.use(adminCheck);
router.post('/create',controller.createCuff);
router.patch('/update/:cuffId',controller.updateCuff);
router.delete('/delete/:cuffId',controller.deleteCuff);

export default router;
