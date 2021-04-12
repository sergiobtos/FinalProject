var client = require("../dbConnection/mongodbConnection");
var ObjectId = require('mongodb').ObjectID;

exports.sendEAlert = (req, res) => {
  const requestData= req.body;
  const alertCollection = client.db("FinalProject").collection("EAlerts");
    // console.log(requestData);

  alertCollection.insertOne(requestData).then(
    data => {
      res.json({
        msg: "Send Alert successful." 
      });
    },
    err => {
      res.json({
        msg: "unable to insert alert to database."
      });
    }
  );
};

exports.getAllActiveEAlert =(req, res) =>{

    const alertsCollection = client.db("FinalProject").collection("EAlerts");
    alertsCollection
      .find({
        status:true,
      })
      .toArray()
      .then(
        (data) => {
          if (!data) {
            res.json({
              msg: "No Alerts for now",
            });
          } else {
            res.json({
              dataArr: data,
              msg: 1,
            });
          }
        },
        (err) => {
          console.log("err" + err);
        }
      );
};

exports.answerAlert=(req, res) =>{
  let alertId = req.body.id;
  let nurseId = req.body.nurseId;
  var query = { _id : ObjectId(alertId) };
  var data = { $set:{status:false,responderId:nurseId} };
  client.db("FinalProject").collection("EAlerts")
  .updateOne(query,data,(err , collection) => {
    if(err) throw err;
    else
    res.json({
      msg: 1
    });
		console.log("Record updated successfully");
		console.log(collection);
  });
};

  
