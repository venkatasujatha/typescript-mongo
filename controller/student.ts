import { Request, Response } from "express";
import { idText } from "typescript";
import { db } from "../config/db";
const record = db.collection('users');

//add data into database
const add = async (req: Request, res: Response) => {
    try {
        if (req.body && Array.isArray(req.body)) {
            const resp = await record.insertMany(req.body);
            res.json({
                message: "multiple records saved successfully",
                resp: resp
            })
        }
        else {
            const resp = await record.insertOne(req.body)
            res.json({
                message: " one record saved successfully",
                resp: resp
            })
        }


    } catch (error) {
        console.log(error)

    }
}
//fetch data
const find = async (req: Request, res: Response) => {

    //const id =JSON.stringify(req.body.id);
    //console.log(id)
    try {

        const resp = await record.find(req.body).toArray();

        res.json({
            message: "based on request body data fetched successfully",
            resp: resp
        })

    } catch (error) {
        console.log(error)

    }

}

//getall
const getAll = async (req: Request, res: Response) => {
    try {
        const resp = await record.find().toArray();
        res.json({
            message: "all records fetched successfully",
            resp: resp
        })


    } catch (error) {
        console.log(error)

    }
}

//update data

const update = async (req: Request, res: Response) => {
    try {
        const resp = await record.updateOne(

            { name: req.body.name },

            { $set: req.body }

        );

        res.json({
            message: "updated successfully",
            resp: resp
        })

    } catch (error) {
        console.log(error)

    }

}

//delete
const delete1 = async (req: Request, res: Response) => {
    try {
        await record.deleteOne(req.body);
        res.json({
            message: "record deleted successfully"
        })

    } catch (error) {
        console.log(error)
    }

}


export { add, find, update, getAll, delete1 }