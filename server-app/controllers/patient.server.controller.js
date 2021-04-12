var client = require("../config/mongodbConnection");
var ml = require('machine_learning');


exports.getMotivationalTipsRender = (req, res) => {
    console.log("I am here")
    const motivationalTipsCollection = client.db("FinalProject").collection("motivationalTips");
    //natural order: The order in which the database refers to documents on disk.
    motivationalTipsCollection.findOne({}, { sort: { $natural: -1 } }).then(
      data => {
        if (!data) {
          res.json({
            msg: "No tips."
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

exports.sendEmergencyAlert = (req, res) => {
    const data= req.body;
    const alertCollection = client.db("FinalProject").collection("emergencyAlerts");  
    alertCollection.insertOne(data).then(
      data => {
        res.json({
          msg: "Your Emergency was sent." 
        });
      },
      err => {
        res.json({
          msg: "Error"
        });
      }
    );
  };

exports.commonSignsChecklist = (req, res) => {
    const requestData = req.body;
    console.log(requestData);
    const answer = ["no", "no", "no", "no"];
  
    requestData.forEach(element => {
  
      if (element === "Cough") {
        answer[0] = "yes";
      }
  
      if (element === "HighFever") {
        answer[1] = "yes";
      }
  
      if (element === "Sniffle") {
        answer[2] = "yes";
      }
  
      if (element === "Headache") {
        answer[3] = "yes";
      }
    });
  
    console.log(answer);
  
    let data = [
      ['no', 'no', 'no', 'no'],
      ['no', 'no', 'no', 'yes'],
      ['no', 'no', 'yes', 'no'],
      ['no', 'no', 'yes', 'yes'],
      ['no', 'yes', 'no', 'no'],
      ['no', 'yes', 'no', 'yes'],
      ['no', 'yes', 'yes', 'no'],
      ['no', 'yes', 'yes', 'yes'],
      ['yes', 'no', 'no', 'no'],
      ['yes', 'no', 'no', 'yes'],
      ['yes', 'no', 'yes', 'no'],
      ['yes', 'no', 'yes', 'yes'],
      ['yes', 'yes', 'no', 'no'],
      ['yes', 'yes', 'no', 'yes'],
      ['yes', 'yes', 'yes', 'no'],
      ['yes', 'yes', 'yes', 'yes']
    ];

    let result = ['Common cold', 'Common cold', 'Common cold', 'Acute Sinusitis', 'None', 'Common cold', 'Bacterial Pneumonia',
      'West Nile Virus', 'Whooping Cough', 'Bacterial Pneumonia', 'Laryngitis', 'Chronic sinusitis', 'Viral Pneumonia', 'Asthma', 'Tonsillitis', 'Erythema multiforme'];
  
    //create new Decision Tree using this dataset
    let dt = new ml.DecisionTree({
      data: data,
      result: result
    });
    dt.build();
    let classificationResult = dt.classify(answer);
    let tree = dt.getTree();
    dt.prune(1.0); // 1.0 : mingain.
  
  
    let classsification = JSON.stringify(classificationResult);
    let classResult = classsification.substring(2, classsification.length - 4);
  
    let medicalAttention = '';
  
    if (classResult === "Common cold" || classResult === "None" || classResult === "Whooping Cough" || classResult === "Acute Sinusitis") {
      medicalAttention = 'No';
    } else {
      medicalAttention = "Yes";
    }
  
    if (medicalAttention === "Yes") {
      res.json({
        msg: "Emergency situation, must go to hospital."
      });
    }
    if (medicalAttention === "No") {
      res.json({
        msg: "Nothing too important, just take a rest and relax."
      });
    } else {
      res.json({
        msg: "Error."
      });
    }
  
  };
  