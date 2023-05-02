import express from 'express'
import controller from '../controllers/Collar.js'
import { adminCheck, decodeToken } from '../middlewares/Auth.js';

const router = express.Router();

router.get('/get/:collarId',controller.readCollar);
router.get('/get/',controller.readAllCollar);
router.use(decodeToken);
router.use(adminCheck);
router.post('/create',controller.createCollar);
router.patch('/update/:collarId',controller.updateCollar);
router.delete('/delete/:collarId',controller.deleteCollar);

export default router;
