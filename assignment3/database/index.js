const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://josh:1234@cluster0.63g31.mongodb.net/bankServer?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function main() {
  try {
    // Connect to MongoDB using MongoClient
    await client.connect();
    console.log("MongoDB connected");

    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri, { dbName: "bankServer" });
    console.log("Mongoose connected");
  } catch (error) {
    console.error(error);
  }
}

main().catch((err) => console.log(err));
