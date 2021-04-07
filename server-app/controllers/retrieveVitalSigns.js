var client = require("../repo/mongodbConnection");

exports.retrieveVitalSignsRender = (req, res) => {
  const vitalSignsCollection = client
    .db("comp308Project")
    .collection("vitalSigns");
  // check if the email and password are right
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