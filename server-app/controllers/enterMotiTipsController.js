var client = require("../repo/mongodbConnection");

exports.enterMotiTipsRender = (req, res) => {
  const motiTips = req.body;
  // get userCollection
  const motiTipsCollection = client.db("comp308Project").collection("motiTips");

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
