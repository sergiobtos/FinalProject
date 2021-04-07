const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb://localhost:27017/";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) {
    console.log("unable to connect to db");
  } else {
    console.log("connected to db");
  }
});

module.exports = client;