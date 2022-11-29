import { match } from "assert";
import { Request, Response } from "express";
import { idText } from "typescript";
import { db } from "../config/db";
const record = db.collection('users');

//add data into database
const add = async (req: Request, res: Response) => {
    try {
        if (req.body && Array.isArray(req.body)) {
            const resp = await record.insertMany(req.body);
            res.status(200).json({
                message: "multiple records saved successfully",
                resp: resp
            })
        }
        else {
            const resp = await record.insertOne(req.body)
            res.status(200).json({
                message: " one record saved successfully",
                resp: resp
            })
        }


    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "unable to insert the data into db"
        })

    }
}
//fetch data
const find = async (req: Request, res: Response) => {

    //const id =JSON.stringify(req.body.id);
    //console.log(id)
    req.body = req.body ? req.body : " ";
    try {

        const resp = await record.find(req.body).toArray();

        res.status(200).json({
            message: "based on request body data fetched successfully",
            resp: resp
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "unable to fetch the data from db"
        })

    }

}
//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
//getall with projection
const getAll = async (req: Request, res: Response) => {
    try {
        const resp = await record.find({}, { projection: { _id: 0, name: 1, department: 1 } }).toArray();
        res.status(200).json({
            message: "all records fetched successfully",
            resp: resp
        })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "unable to fetch the data from db"
        })

    }
}

//update data

const update = async (req: Request, res: Response) => {
    //var myQuery = { name: req.body.name };
    var myQuery = { userId: req.body.userId }

    var newValue = { $set: req.body }
    try {
        const resp = await record.updateOne(
            myQuery, newValue
        );

        res.status(200).json({
            message: "updated successfully",
            resp: resp
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "unable to update the data"
        })

    }

}
//update many using updateMany
const updateMany = async (req: Request, res: Response) => {
    //var myQuery = { name: req.body.name };
    var myQuery = { department: req.body.department }

    var newValue = { $set: req.body }
    try {
        const resp = await record.updateMany(
            myQuery, newValue
        );

        res.status(200).json({
            message: "updated successfully",
            resp: resp
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "unable to update the data"
        })

    }

}
//update many 
const update1 = async (req: Request, res: Response) => {
    //var myQuery = { name: req.body.name };
    try {
        const recordsToUpdate = await record
            .find(req.body.where)
            .toArray();
        console.log("result", recordsToUpdate);

        for (const rec of recordsToUpdate) {
            console.log("value", rec.department);
            await record.findOneAndUpdate(
                { department: rec.department },
                { $set: req.body.data }
            );

        }

        res.status(200).json({
            message: "updated successfully",
            resp: recordsToUpdate
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "unable to update the data"
        })

    }

}

//delete
const delete1 = async (req: Request, res: Response) => {
    try {
        await record.deleteOne(req.body);
        res.status(200).json({
            message: "record deleted successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "unable to delete the data"
        })
    }

}

//delete many records using deleteMany
const deleteManyRecords = async (req: Request, res: Response) => {
    req.body = req.body ? req.body : " ";
    try {
        await record.deleteMany(req.body);
        res.status(200).json({
            message: "multiple records are deleted successfully"
        })


    } catch (error) {
        res.status(400).json({
            message: "unable to delete multiple data"
        })

    }
}

// //filtering
// const filtering = async (req: Request, res: Response) => {
//     //req.body.where =req.body.where?req.body.where:" ";
//     try {
//         var query = { name: (/req.body\w*/g)}
//         console.log(query)
//         const resp = await record.find(query).toArray();
//         console.log(resp)
//         res.status(200).json({
//             message: "fetched the data successfully",
//             resp: resp
//         })
//     }
//     catch (error) {
//         res.status(400).json({
//             message: "unable to fetch the data"
//         })

//     }
// }

export { add, find, update, getAll, delete1, update1, updateMany, deleteManyRecords }