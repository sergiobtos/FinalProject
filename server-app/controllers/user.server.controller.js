var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var client = require("../config/mongodbConnection");
const secret = 'test';


exports.signupRender = async (req, res) => {
  const userData = req.body;
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  userData.password = hashedPassword;
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

exports.signinRender =  (req, res) => {
  const loginData = req.body;
  // get userCollection
  const userCollection = client.db("FinalProject").collection("users");
  // check if the email and password are right
  userCollection
    .findOne({
      userName: loginData.userName
    })
    .then(
      async data => {
        if (!data) {
          res.json({
            error: true,
            errormsg: "Username doesn't exist, please try again."
          });
        } else {
          const isPasswordCorrect = await bcrypt.compare(loginData.password, data.password);
          console.log("Console ispasswordcorrect: ",isPasswordCorrect);
          if(!isPasswordCorrect){
            res.status(400).json({
              error: true, errormsg: "Password incorrect"
            })
            console.log("Console ispasswordcorrect: ",isPasswordCorrect);
          }else{
            const token =  jwt.sign({username: data.userName, id: data._id}, secret, {expiresIn: "86400"});
            res.status(200).json({
              ...data,
              error: false,
              token
            });
          }   
        }
      },
      err => {
        res.status(500).json({errormsg: "Something went wrong", error: true});
        console.log("err" + err);
      }
    );
};

exports.findAllPatients = (req, res) => {
  var json = [];
  const collection = client.db("FinalProject").collection("users");
  collection.find({accountType: "Patient"}).toArray(function(err, results){
    results.forEach(function(userNames){
      json.push(userNames.userName);
    });
    res.send(JSON.stringify(json));
  });
};

