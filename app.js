const express = require("express");
const app = express();
const Cors = require("cors");
const port = 8000;
console.log("hello I am calling");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Cors());
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/formDB", { useNewUrlParser: true, useUnifiedTopology: true });
const nameSchema = new mongoose.Schema({
    firstName: String,    
    phoneName:Number,
    emailName:String


});
const User = mongoose.model("User", nameSchema);



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

app.get("/getData",(req,res) => {
    User.find({},(err,doc) => {
        if(err){
            res.json(err)
        }else{
            res.json(doc)
        }
    })
})

app.listen(port, () => {
    console.log("Server listening on port " + port);
});


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

