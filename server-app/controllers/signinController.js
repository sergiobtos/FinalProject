var client = require("../dbConnection/mongodbConnection");

exports.signinRender = (req, res) => {
  const loginData = req.body;
  console.log(loginData);
  // get userCollection
  const userCollection = client.db("FinalProject").collection("users");
  // check if the email and password are right
  userCollection
    .findOne({
      userName: loginData.userName,
      password: loginData.password
    })
    .then(
      data => {
        if (!data) {
          res.json({
            msg: "Wrong email address or password, please input again."
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
