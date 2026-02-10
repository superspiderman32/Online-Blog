import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const client = new MongoClient(process.env.CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

process.on('SIGINT', ()=>{
  client.close();
  console.log("closed database connection");
  process.exit(1);
})

const connection = client.connect();
const database = client.db('2600Project'); 

export { connection, database };