

const people = require('./people.js');
const places = require('./places.js');


const mongo =require('mongodb');


var insertPersonToDB = (args) => {


var url = "mongodb://localhost:27017/npc_generator"
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("npc_generator");
  dbo.collection("people").insertOne(people.createPerson(args), function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

}

var insertBuildingToDB = (args) => {

  var url = "mongodb://localhost:27017/npc_generator"
  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("npc_generator");
    dbo.collection("places").insertOne(places.populateHouse(args), function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}

insertPersonToDB();
insertBuildingToDB()
