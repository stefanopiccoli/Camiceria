import express from 'express';
import controller from '../controllers/Fabric.js';
const router = express.Router();
router.post('/create', controller.createFabric);
router.get('/get/:fabricId', controller.readFabric);
router.get('/get/', controller.readAllFabric);
router.patch('/update/:fabricId', controller.updateFabric);
router.delete('/delete/:fabricId', controller.deleteFabric);
export default router;
