import express, {Request,Response} from "express";
import * as studentController from "../controller/student";
const router =express.Router();

router.post('/save',studentController.add);
router.get('/get',studentController.find);
router.put("/updatemany",studentController.updateMany);
router.delete("/deleteManyRecords",studentController.deleteManyRecords);
//router.get('/getall',studentController.getAll)
//router.put('/update',studentController.update);
//router.delete('/deleterecord',studentController.delete1);
//router.put('/update1',studentController.update1);
//router.get("/filtering",studentController.filtering)
export{
    router
}