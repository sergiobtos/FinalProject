var client = require("../dbConnection/mongodbConnection");

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