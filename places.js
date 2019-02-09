//import files
const utils  = require('./utils.js' );
const people = require('./people.js');
const words  = require('./words.js' );
//-----------------------

//some generic properties
const propertyTypes = ["detached", "semi-detached", "terrace", "bungalow", "townhouse", "flat", "cottage"];
const basement = [ true, false ];
const garden   = [ true, false ];
const residentialPlaceSuffix = ["street", "road", "avenue", "lane", "drive", "place", "court", "boulevard"]
//-----------------------

//creates a house with random properties and populates it with a person/persons
var populateHouse = (numberOfHouses) => {
  var houses = [];

  if (numberOfHouses === undefined || numberOfHouses === 1){
    let house = {};
    house.occupants = people.createPerson();
    house.numberOfBedrooms = utils.getRandomNumber( 1 , 5 );
    house.type = utils.getRandomItem(propertyTypes);
    house.basement = utils.getRandomItem(basement);
    house.garden = utils.getRandomItem(garden);
    return house;
  }
  else {
    for (numberOfHouses ; numberOfHouses > 0 ; numberOfHouses --){
      let house = {};
      house.occupants = people.createPerson();
      house.numberOfBedrooms = utils.getRandomNumber( 1 , 5 );
      house.type = utils.getRandomItem(propertyTypes);
      house.basement = utils.getRandomItem(basement);
      house.garden = utils.getRandomItem(garden);
      houses.push(house);
    }
    return houses;
  }
}

//creates a place such as a street or a lane, populates it with houses
var populateResidentialPlace = ( min , max ) => {
  var residentialPlace = {
                          placeInfo:{}
                         };

  if (min === undefined || max === undefined){

    let numberOfHouses = utils.getRandomNumber( 10 , 70 );
    var placeName = utils.getRandomItem(words.randomWords) + " " + utils.getRandomItem(residentialPlaceSuffix);

      for ( numberOfHouses; numberOfHouses > 0; numberOfHouses -- ){
        let house = populateHouse();
        house.houseNumber = numberOfHouses;
        house.fullAddress = house.houseNumber + " " + placeName;
        residentialPlace[house.fullAddress] = house;

    }
    residentialPlace
    return residentialPlace;

  }else {
      let numberOfHouses = utils.getRandomNumber( min , max );
      var placeName = utils.getRandomItem(words.randomWords) + " " + utils.getRandomItem(residentialPlaceSuffix);

        for ( numberOfHouses; numberOfHouses > 0; numberOfHouses -- ){
          let house = populateHouse();
          house.houseNumber = numberOfHouses;
          house.fullAddress = house.houseNumber + " " + placeName;

          residentialPlace[house.fullAddress] = house;
    }
    return residentialPlace;

  }

}



///testing///
const fs =require('fs');

fs.writeFile('places.txt', JSON.stringify(populateResidentialPlace(), undefined, 2), (err) => {
  if (err) throw err;

  console.log("saved")
})
