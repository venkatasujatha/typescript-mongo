import express, {Request,Response} from "express";
import * as studentController from "../controller/student";
import { find } from "../controller/student";
const router =express.Router();

router.post('/save',studentController.add);
router.get('/get',studentController.find);
router.get('/getall',studentController.getAll)
router.put('/update',studentController.update);
router.delete('/deleterecord',studentController.delete1);

export{
    router
}