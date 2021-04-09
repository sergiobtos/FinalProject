const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb://localhost:27017/";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) {
    console.log("Error in the connection");
  } else {
    console.log("Successfull connected to DB");
  }
});

module.exports = client;