var client = require("../config/mongodbConnection");



exports.getMotivationalTipsRender = (req, res) => {
    const motivationalTipsCollection = client.db("FinalProject").collection("motivationalTips");
    //natural order: The order in which the database refers to documents on disk.
    motivationalTipsCollection.find().toArray().then(
      data => {
        if (data === null) {
          
          res.json({
            result: 0,
            msg: "No Motivational Tips for now, maybe tomorow."
          });
        } else {
          res.json({
            dataArray: data,
            msg: "Here are the Motivational Tips for you today",
            result: 1
          });
        }
      },
      err => {
        console.log("err" + err);
      }
    );
  };

exports.sendEmergencyAlert = (req, res) => {
    const data= req.body;
    const alertCollection = client.db("FinalProject").collection("emergencyAlerts");
    if(data.message.length === 0){
      res.json({
        msg: "The form can not be empty",
        inserted : 1
      })
    }else{

      alertCollection.insertOne(data).then(
        data => {
          //inserted { 0 = inserted with success, 1 = error , 3 = button submit wasn't clicked yet}
          res.json({
            msg: "Alert sent! Your nurse will get notification",
            inserted : 0, 
            emergencyAlert : data
          });
        },
        err => {
          //inserted { 0 = inserted with success, 1 = error , 3 = button submit wasn't clicked yet}
          res.json({
            msg: "Error when tried to send your emergency alert, try later",
            inserted : 1
          });
        }
      );
    }
  };

  