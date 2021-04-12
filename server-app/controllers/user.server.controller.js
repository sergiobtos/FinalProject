var client = require("../dbConnection/mongodbConnection");

exports.signupRender = (req, res) => {
  const userData = req.body;
  // get userCollection
  const userCollection = client.db("FinalProject").collection("users");
  // check if the userName exsits in db
  userCollection.findOne({ userName: userData.userName }).then(
    data => {
      if (!data) {
        // insert data to database
        userCollection.insertOne(userData).then(
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

exports.signinRender = (req, res) => {
  console.log("signin into");
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

exports.findAllPatients = (req, res) => {
  var json = [];
  const collection = client.db("FinalProject").collection("users");
  collection.find({}).toArray(function(err, results){
    results.forEach(function(userNames){
      json.push(userNames.userName);
    });
    res.send(JSON.stringify(json));
  });
};

