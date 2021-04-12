var client = require("../config/mongodbConnection");
var ObjectId = require('mongodb').ObjectID;

exports.addVitalSignsRender = (req, res) => {
    const VitalSigns = req.body;
    // get userCollection
    const VitalSignsCollection = client.db("FinalProject").collection("vitalSigns");
    // insert data to database
    VitalSignsCollection.insertOne(VitalSigns).then(
      data => {
        res.json({
          msg: "Send Vital Signs successful." // succeed
        });
      },
      err => {
        res.json({
          msg: "unable to insert tips to database."
        });
      }
    );
  };

exports.getVitalSignsRender = (req, res) => {
    const vitalSignsCollection = client
      .db("FinalProject")
      .collection("vitalSigns");
    vitalSignsCollection
      .find()
      .toArray()
      .then(
        (data) => {
          if (!data) {
            res.json({
              msg: "No Vital Signs for now",
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

exports.addMotivationalTipsRender = (req, res) => {
    const data = req.body;
    // get userCollection
    const motivationalTipsCollection = client.db("FinalProject").collection("motivationalTips");
  
    // insert data to database
    motivationalTipsCollection.insertOne(data).then(
      data => {
        res.json({
          msg: "Motivational Tips added successfully." // succeed
        });
      },
      err => {
        res.json({
          msg: "Error to insert tips to database."
        });
      }
    );
  };

exports.getAllEmergencyAlert =(req, res) =>{
    const alertsCollection = client.db("FinalProject").collection("emergencyAlerts");
    alertsCollection
      .find({status:true,})
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
  const alertsCollection = client.db("FinalProject").collection("emergencyAlerts");
  let alertId = req.body.id;
  let nurseId = req.body.nurseId;
  var query = { _id : ObjectId(alertId) };
  var data = { $set:{status:false,responderId:nurseId} };
  alertsCollection.updateOne(query,data,(err , collection) => {
    if(err) {throw err;}
    else{
      console.log("line 102: ",alertId)
      alertsCollection.find({_id: alertId,}).toArray()
      .then(
        (data) =>{
          console.log("Line 107: ", data);
          res.json({
            msg: 1,
            patientUsername : data.patientUserName
          })
        },
        (err) => {
          console.log("err" + err);
        }
      )
      console.log("Record updated successfully");
    }	
  });
};

  