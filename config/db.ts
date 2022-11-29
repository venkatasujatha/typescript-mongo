import {MongoClient} from "mongodb";
const con=   'mongodb://localhost:27017'

const client =new MongoClient(con)

const db =client.db('employee')

export{db}