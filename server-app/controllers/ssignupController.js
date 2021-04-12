var client = require("../dbConnection/mongodbConnection");

exports.signupRender = (req, res) => {
  const userInfoData = req.body;
  // get userCollection
  const userCollection = client.db("FinalProject").collection("users");
  // check if the userName exsits in db
  userCollection.findOne({ userName: userInfoData.userName }).then(
    data => {
      if (!data) {
        // insert data to database
        userCollection.insertOne(userInfoData).then(
          data => {
            res.json({
              msg: 1 // succeed
            });
          },
          err => {
            res.json({
              msg: "unable to insert data to database."
            });
          }
        );
      } else {
        res.json({
          msg: "This user name has been registered, please input again."
        });
      }
    },
    err => {
      console.log("err" + err);
    }
  );
};
