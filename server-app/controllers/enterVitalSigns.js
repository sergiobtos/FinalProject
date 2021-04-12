var client = require("../dbConnection/mongodbConnection");

exports.enterViatlSignsRender = (req, res) => {
    const VitalSigns = req.body;
    // get userCollection
    const VitalSignsCollection = client.db("FinalProject").collection("vitalSigns");
   console.log(VitalSigns);
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