
import { Request, Response } from "express";
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
    let resp;
    var totalcount;
    try {
        //if only pagination is provided
        if ((req.body.skip || req.body.skip === 0) && req.body.take) {

            resp = await record
      
              .find(req.body.where)
      
              .limit(req.body.take)
      
              .skip(req.body.skip)
      
              .toArray();
      
            totalcount = await record.estimatedDocumentCount();
            console.log("totalCount:", totalcount);
      
          }
        //if Pagination params and filters provided
       else if((req.body.pages || req.body.pages === 0) && req.body.size) {
            resp = await record
              .find({
                $or: [
                  { name:  { $regex: '.*' + req.body.name + '.*' } },
                  {department :{$regex:'.*'+req.body.department+'.*'}}
                ],
              },{ projection: { _id: 0, name: 1, department: 1 } })
              .limit(req.body.size)
              .skip(req.body.pages)
              .toArray();
              totalcount =await record.estimatedDocumentCount();
              console.log("result",totalcount)
          }
          
          //if Pagination params not provided
          else {
            resp = await record.find(req.body).toArray();
           }
        //const resp = await record.find(req.body).toArray();

        res.status(200).json({
            message: "based on request body data fetched successfully",
            resp: resp,
            totalcount:totalcount
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "unable to fetch the data from db"
        })

    }

}
//update many using updateMany
const updateMany = async (req: Request, res: Response) => {
    //var myQuery = { name: req.body.name };
    var myQuery = { department: req.body.department }

    var newValue = { $set: req.body }
    try {
        //multiple updates
        if(req.body.where)
        {
            const resp = await record.updateMany(
                myQuery, newValue
            );
    
            res.status(200).json({
                message: "multiple records updated successfully",
                resp: resp
            })

        }
        else{
            //single update
            const resp = await record.updateOne(
                myQuery, newValue
            );
            res.status(200).json({
                message: "one record updated successfully",
                resp: resp
            })

        }
        

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "unable to update the data"
        })

    }

}
//delete many records using deleteMany
const deleteManyRecords = async (req: Request, res: Response) => {
    req.body = req.body ? req.body : " ";
    try {
        //multiple delete
        if(req.body.where)
        {
            await record.deleteMany(req.body.where);
        res.status(200).json({
            message: "multiple records are deleted successfully"
        })
        }
        else{
            //single delete
            await record.deleteOne(req.body)
            res.status(200).json({
                message: "record deleted successfully"
            })
        }
        

    } catch (error) {
        res.status(400).json({
            message: "unable to delete multiple data"
        })

    }
}

// //update data

// const update = async (req: Request, res: Response) => {
//     //var myQuery = { name: req.body.name };
//     var myQuery = { userId: req.body.userId }

//     var newValue = { $set: req.body }

//     try {
//         const resp = await record.updateOne(
//             myQuery, newValue
//         );

//         res.status(200).json({
//             message: "updated successfully",
//             resp: resp
//         })

//     } catch (error) {
//         console.log(error);
//         res.status(400).json({
//             message: "unable to update the data"
//         })

//     }

// }

// //update many 
// const update1 = async (req: Request, res: Response) => {
//     //var myQuery = { name: req.body.name };
//     try {
//         const recordsToUpdate = await record
//             .find(req.body.where)
//             .toArray();
//         console.log("result", recordsToUpdate);

//         for (const rec of recordsToUpdate) {
//             console.log("value", rec.department);
//             await record.findOneAndUpdate(
//                 { department: rec.department },
//                 { $set: req.body.data }
//             );

//         }

//         res.status(200).json({
//             message: "updated successfully",
//             resp: recordsToUpdate
//         })

//     } catch (error) {
//         console.log(error);
//         res.status(400).json({
//             message: "unable to update the data"
//         })

//      }

//  }
 

// //getall with projection
// const getAll = async (req: Request, res: Response) => {
//     try {
//         const resp = await record.find({}, { projection: { _id: 0, name: 1, department: 1 } }).toArray();
//         res.status(200).json({
//             message: "all records fetched successfully",
//             resp: resp
//         })


//     } catch (error) {
//         console.log(error);
//         res.status(400).json({
//             message: "unable to fetch the data from db"
//         })

//     }
// }
// //delete
// const delete1 = async (req: Request, res: Response) => {
//     try {
    
//         await record.deleteOne(req.body);
//         res.status(200).json({
//             message: "record deleted successfully"
//         })

//     } catch (error) {
//         console.log(error);
//         res.status(400).json({
//             message: "unable to delete the data"
//         })
//     }

// }



//filtering
// const filtering = async (req: Request, res: Response) => {
//     //req.body.where =req.body.where?req.body.where:" ";
//     try {
//         // var query = { name:  { $regex: '.*' + req.body.name + '.*' } }
//         // var query1 ={department :{$regex:'.*'+req.body.department+'.*'}}
//         // console.log(query)
//         // console.log(query1)
//         //const resp = await record.find(query).toArray();

        
//         // const { search } = req.body;
//         // const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
//         // const searchRgx = rgx(search);

//         const resp =await record.find({
//             $or: [
//               { name:  { $regex: '.*' + req.body.name + '.*' } },
//               {department :{$regex:'.*'+req.body.department+'.*'}}
//             ],
//           }).toArray()
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

export { add, find, updateMany, deleteManyRecords }