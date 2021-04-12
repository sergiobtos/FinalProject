var client = require("../dbConnection/mongodbConnection");

exports.retrieveMotiTipsRender = (req, res) => {
  const motiTipsCollection = client.db("FinalProject").collection("motiTips");
  // check if the email and password are right
  motiTipsCollection.findOne({}, { sort: { $natural: -1 } }).then(
    data => {
      if (!data) {
        res.json({
          msg: "No tips for now"
        });
      } else {
        res.json({
          ...data,
          msg: 1
        });
      }
    },
    err => {
      console.log("err" + err);
    }
  );
};
