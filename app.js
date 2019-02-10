

const people = require('./people.js');
const places = require('./places.js');
const mongo =require('mongodb');
const url = "mongodb://localhost:27017/npc_generator";
const MongoClient = require('mongodb').MongoClient;




var dbInsert = (table, request) => {

  MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    var dbo = db.db("npc_generator");
    dbo.collection(table).insertOne(request, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });

}



var insertPersonToDB = (args) => {

  dbInsert("people", people.createPerson());

}

var insertBuildingToDB = (args) => {

  dbInsert("homes", places.populateHouse());

}

var insertResPlaceInDB = (args) => {

  dbInsert("places", places.populateResidentialPlace());

}

var dbFind = () => {

  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("npc_generator");
  dbo.collection("people").find({}, { projection: { _id: 0, firstName: 1, lastName: 1 }} ).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

}


// insertPersonToDB();
// insertBuildingToDB()
// insertResPlaceInDB();

dbFind();
