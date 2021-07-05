const express = require("express");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://admin-praveen:test123@cluster0.dsmzc.mongodb.net/formDB", { useNewUrlParser: true, useUnifiedTopology: true });
const nameSchema = new mongoose.Schema({
    firstName: String,    
    phoneName:Number,
    emailName:String


});
const User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
    User.find({$or: [ { emailName: req.body.emailName}, { phoneName: req.body.phoneName} ] },(err,doc) => {
        if(err){
            res.send(err)
        }else{
            if(doc.length){
                res.send("Emai or Mobile alredy existed")
            }else{
               const myData = new User(req.body);
               myData.save()
                   .then(item => {
                       res.send("Name saved to database");
                   })
                   .catch(err => {
                       res.status(400).send("Unable to save to database");
                   });
            }
        }
       
   
   })
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port)

app.listen(port, () => {
    console.log("Server has started succesfully);
});




