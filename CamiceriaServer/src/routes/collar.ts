import express from 'express'
import controller from '../controllers/Collar'

const router = express.Router();

router.post('/create',controller.createCollar);
router.get('/get/:collarId',controller.readCollar);
router.get('/get/',controller.readAllCollar);
router.patch('/update/:collarId',controller.updateCollar);
router.delete('/delete/:collarId',controller.deleteCollar);

export = router;