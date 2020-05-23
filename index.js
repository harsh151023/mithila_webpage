const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const users= require('./models/users');
const request = require('request');
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
app.use('/', require('./routes'));




  app.post('/userdetail',function(req,res){
    // g-recaptcha-response is the key that browser will generate upon form submit.
    // if its blank or null means user has not selected the captcha, so return the error.
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return  res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
        
    }
    // Put your secret key here.
    var secretKey = "6LeCdvQUAAAAAK0JOZsPERZqWL-APdlc0UuW8pdL";
    // req.connection.remoteAddress will provide IP address of connected user.
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + "6LeCdvQUAAAAAK0JOZsPERZqWL-APdlc0UuW8pdL" + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl,function(error,response,body) {
      body = JSON.parse(body);
      // Success will be true or false depending upon captcha validation.
      if(body.success !== undefined && !body.success) {
        return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
      }
      users.create({
        name: req.body.name,
        mobile: req.body.mobile,
        description:req.body.description,
    }, function(err, newContact){
        if(err){console.log('Error in creating a contact!')
            return;}
            console.log('******', newContact);
            return res.redirect('back');
            

    })
    });
  });
  
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})
