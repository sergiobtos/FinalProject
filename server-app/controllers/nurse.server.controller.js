var client = require("../config/mongodbConnection");
var ObjectId = require('mongodb').ObjectID;

exports.addVitalSignsRender = (req, res) => {
    const VitalSigns = req.body;
    VitalSigns.bodyTemperature = parseInt(req.body.bodyTemperature);
    VitalSigns.heartRate = parseInt(req.body.heartRate);
    VitalSigns.bloodPressure = parseInt(req.body.bloodPressure);
    VitalSigns.respiratoryRate = parseInt(req.body.respiratoryRate);

    // get userCollection
    const VitalSignsCollection = client.db("FinalProject").collection("vitalSigns");
    // insert data to database
    VitalSignsCollection.insertOne(VitalSigns).then(
      data => {
        res.json({
          msg: "Vital Signs was added successfully." 
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
          if (!data.length) {
            res.json({
              msg: false,
            });
          } else {
            res.json({
              dataArr: data,
              msg: true,
            });
          }
        },
        (err) => {
          console.log("err" + err);
        }
      );
};

exports.replyAlert=(req, res) =>{
  const alertsCollection = client.db("FinalProject").collection("emergencyAlerts");
  let alertId = req.body.id;
  let nurseId = req.body.nurseId;
  var query = { _id : ObjectId(alertId) };
  var data = { $set:{status:false,responderId:nurseId} };
  alertsCollection.updateOne(query,data,(err , collection) => {
    if(err) {throw err;}
    else{
      alertsCollection.find({_id: ObjectId(alertId)}).toArray()
      .then(
        (data) =>{
          res.json({
            msg: 1,
            patientUsername: data
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

  