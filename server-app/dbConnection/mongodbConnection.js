const MongoClient = require("mongodb").MongoClient;
const url =  "mongodb://localhost:27017/";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbName = 'FinalProject';

client.connect((err) => {
  if (err) {
    console.log("Error in the connection");
  } else {
    const db = client.db(dbName);
    console.log("Successfull connected to DB");
  }
});

module.exports = client;