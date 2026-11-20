import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: '../backend/demo/.env' });
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const destinations = await client.db('test').collection('tours').distinct('destination');
    console.log("Destinations in DB:", destinations);
    const firstTour = await client.db('test').collection('tours').findOne({});
    console.log("First tour destination field:", firstTour?.destination);
  } finally {
    await client.close();
  }
}
run();
