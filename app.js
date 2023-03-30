//ejshint esversion:6

const express = require("express");

const request = require("request");
const bodyparser = require("body-parser");
const https = require("https");
const app = express();


app.use(express.static("public"));// proving the path of our static files
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
const firstname = req.body.fNAME;
const lastname = req.body.lNAME;
const email = req.body.email;
const data = {
  members:[
    {
      email_address: email,
   status: "subscribed",
   merge_fields: {
 	FNAME: firstname,
 	LNAME: lastname,
      }
    }
  ]
};

const jsonData = JSON.stringify(data);

const url = "https://us21.api.mailchimp.com/3.0/lists/89106ff63f";

const options = {
  method : "POST",
  auth:"igor1:234930ecbb76c0805d51f479fd332069-us21"
}
const request = https.request(url, options, function(response){

  if (  response.statusCode === 200){
    res.sendFile(__dirname + "/success.html")


  }else{
    res.sendFile(__dirname + "/failure.html")
  }


  response.on("data", function(data){
    console.log(JSON.parse(data));
  });

});
request.write(jsonData);
request.end();
});
    // this post request help the user to go back to the main page in case of error while signing up
app.post("/failure", function (req, res){
res.redirect("/")
});


app.listen(process.env.PORT ||3000, function(){
  console.log("the serve is running on port 3000");
});

//APIKEY
//234930ecbb76c0805d51f479fd332069-us21

// list id
// 89106ff63f
