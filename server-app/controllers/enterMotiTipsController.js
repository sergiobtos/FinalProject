var client = require("../dbConnection/mongodbConnection");

exports.enterMotiTipsRender = (req, res) => {
  const motiTips = req.body;
  // get userCollection
  const motiTipsCollection = client.db("FinalProject").collection("motiTips");

  // insert data to database
  motiTipsCollection.insertOne(motiTips).then(
    data => {
      res.json({
        msg: "Send daily motivational tips successful." // succeed
      });
    },
    err => {
      res.json({
        msg: "unable to insert tips to database."
      });
    }
  );
};
