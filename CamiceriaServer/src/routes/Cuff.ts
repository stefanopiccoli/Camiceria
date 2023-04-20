import express from 'express'
import controller from '../controllers/Cuff.js'

const router = express.Router();

router.post('/create',controller.createCuff);
router.get('/get/:cuffId',controller.readCuff);
router.get('/get/',controller.readAllCuff);
router.patch('/update/:cuffId',controller.updateCuff);
router.delete('/delete/:cuffId',controller.deleteCuff);

export default router;
