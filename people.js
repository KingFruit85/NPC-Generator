//import files

const bodyParts =require('./bodyParts.js');
const clothes =require('./clothes.js');
const descriptors =require('./descriptors.js');
const names =require('./names.js');
const occupation =require('./occupations.js');
const traits =require('./traits.js');
const death =require('./death.js');
const utils =require('./utils.js');

const fs =require('fs');


//-----------------------

//some generic properties

const genders = ["male", "female"];
const ages = ["infant", "child","youth","adult","senior"];


//-----------------------


var getGender = (person, gender) => {

  if (gender === undefined){

    person.gender = utils.getRandomItem(genders);

}
    else if (gender === "male"){person.gender = "male";}
    else if (gender === "female"){person.gender = "female";}
    else{person.gender = "invalid gender arguement";}
      return person;
  }


var createName = (person) => {
  if (person.gender === "male"){
    person.firstName = utils.getRandomItem(names.maleNames);
    person.lastName  = utils.getRandomItem(names.lastNames);
  }
    else{
      person.firstName = utils.getRandomItem(names.femaleNames);
      person.lastName  = utils.getRandomItem(names.lastNames);
      }
      return person;
    }

//this function needs a rewrite, too complicated and doesnt catch errors
var createAge = (person, category) => {

  if     (category === "infant"){person.age  = 1; person.ageCategory = "infant"}
  else if(category === "child") {person.age  = utils.getRandomNumber( 2 ,  15 ); person.ageCategory = "child";  return person;}
  else if(category === "youth") {person.age  = utils.getRandomNumber( 15 , 24 ); person.ageCategory = "youth";  return person;}
  else if(category === "adult") {person.age  = utils.getRandomNumber( 25 , 64 ); person.ageCategory = "adult";  return person;}
  else if(category === "senior"){person.age  = utils.getRandomNumber( 64 , 99 ); person.ageCategory = "senior"; return person;}
  else if(category === undefined){
    person.age = utils.getRandomNumber( 1, 99 );
    switch (true) {
      case ( person.age === 1 )                  :person.ageCategory = "infant";break;
      case ( person.age >1 && person.age <15 )   :person.ageCategory = "child";break;
      case ( person.age > 14 && person.age < 25 ):person.ageCategory = "youth";break;
      case ( person.age > 24 && person.age < 65 ):person.ageCategory = "adult";break;
      case ( person.age > 64 )                   :person.ageCategory = "senior";break;
      default: person.ageCategory = "Fell though switch case statement";
      return person;
  }
  }
  else if(category !== "infant"
        ||category !== "child"
        ||category !== "youth"
        ||category !== "adult"
        ||category !== "senior"
        ||category !== undefined)
        {throw new Error("Invalid arguement")} //this doesnt seem to work...

}


var getMaritalStatus = (person) => {

  switch (true) {
    case person.ageCategory === "infant"                               :person.maritalStatus = "single";break;
    case person.ageCategory === "child"                                :person.maritalStatus = "single";break;
    case person.ageCategory === "youth"  && person.gender === "male"   :person.maritalStatus = utils.getRandomItem(["single","in a relationship","married","widower"]);break;
    case person.ageCategory === "youth"  && person.gender === "female" :person.maritalStatus = utils.getRandomItem(["single","in a relationship","married","widow"]);break;
    case person.ageCategory === "adult"  && person.gender === "male"   :person.maritalStatus = utils.getRandomItem(["single","in a relationship","married","widower"]);break;
    case person.ageCategory === "adult"  && person.gender === "female" :person.maritalStatus = utils.getRandomItem(["single","in a relationship","married","widow"]);break;
    case person.ageCategory === "senior" && person.gender === "male"   :person.maritalStatus = utils.getRandomItem(["single","in a relationship","married","widower"]);break;
    case person.ageCategory === "senior" && person.gender === "female" :person.maritalStatus = utils.getRandomItem(["single","in a relationship","married","widow"]);break;
    default:person.maritalStatus = "fell though switch statement"

  }
  return person;
}


var getTraits = (person) => {

  person.positiveTrait = utils.getRandomItem(traits.positiveTraits);
  person.neutralTrait  = utils.getRandomItem(traits.neutralTraits);
  person.badTrait      = utils.getRandomItem(traits.badTraits);

  return person;
}


var getHeight = (person) => {
  person.height = {};
  switch (true) {
    case ( person.age === 1 )                   : person.height.feet = 1; person.height.inches = utils.getRandomNumber( 0 , 7  );break;
    case ( person.age > 1  && person.age < 4 )  : person.height.feet = 2; person.height.inches = utils.getRandomNumber( 6 , 11 );break;
    case ( person.age > 3  && person.age < 9 )  : person.height.feet = 3; person.height.inches = utils.getRandomNumber( 1 , 11 );break;
    case ( person.age > 8  && person.age < 13)  : person.height.feet = 4; person.height.inches = utils.getRandomNumber( 1 , 11 );break;
    case ( person.age > 12 && person.age < 16 ) : person.height.feet = 5; person.height.inches = utils.getRandomNumber( 1 , 8  );break;
    case ( person.age > 16 )                    : person.height.feet = utils.getRandomNumber( 5 , 6); person.height.inches = utils.getRandomNumber( 1 , 11 );break;
    default:"Fell though switch case statement"

  }
  return person
}


var getOccupation = (person) => {

  if (person.age < 16) {person.profession = "unemployed"}
  else if (person.age >= 65) {person.profession = "retired"}
  else{
    person.profession = utils.getRandomItem(occupation.occupation)
  }
  return person;

}

var createFeatures = (person) =>{

  person.eyeColour  = utils.getRandomItem(["brown","hazel","blue", "green","silver","amber"]);
  person.hairColour = utils.getRandomItem(["brown","blond","black","auburn","red","gray","white"]);
  person.hairLength = utils.getRandomItem(["short","long","medium"]);
  person.skinTone   = utils.getRandomItem(["pale white", "fair", "light brown","olive","brown","dark brown","black"]);

  return person;

}


var createSpouse = (person) => {

  if (person.ageCategory === "infant" || person.ageCategory === "child" || person.maritalStatus === "single")
  {

    person.spouse = "no spouse";

  }
  else if (person.gender === "male") {

    switch (true) {

      case person.ageCategory === "youth" : person.spouse = createSpousePerson(person, "female");break;
      case person.ageCategory === "adult" : person.spouse = createSpousePerson(person, "female");break;
      case person.ageCategory === "senior": person.spouse = createSpousePerson(person, "female");break;
      default:person.spouse = "fell though switch statement"

    }

  }
  else if (person.gender === "female"){

    switch (true) {
      case person.ageCategory === "youth" : person.spouse = createSpousePerson(person, "male");break;
      case person.ageCategory === "adult" : person.spouse = createSpousePerson(person, "male");break;
      case person.ageCategory === "senior": person.spouse = createSpousePerson(person, "male");break;
      default:person.spouse = "fell though switch statement"

    }

  }

  return person;

}


var createSpousePerson = (person, gender) => {

  spouse = {}

  if (person.maritalStatus === "widow" || person.maritalStatus === "widower")
  {

    spouse.status = "deceased"
    getGender(spouse, gender)
    createName(spouse);
    createAge(spouse, person.ageCategory);
    spouse.relationshipLength = utils.getRandomNumber(1 , (spouse.age - 16))
    spouse.causesOfDeath = utils.getRandomItem(death.causesOfDeath);

  }
  else{

    spouse.status = "alive"

    getGender(spouse)
    createName(spouse);
    createAge(spouse, person.ageCategory);
    spouse.maritalStatus = person.maritalStatus;
    getHeight(spouse);
    getOccupation(spouse);
    createFeatures(spouse);
    getTraits(spouse);
    spouse.relationshipLength = utils.getRandomNumber(1 , (spouse.age - 16))

    if (person.maritalStatus === "married" || person.maritalStatus === "widow" || person.maritalStatus == "widower")
    {

        spouse.lastName = person.lastName;

    }
  }

  return spouse;

}

//new createChild function

var createChild = (person) =>{

  if (person.spouse != "no spouse" && person.spouse.gender != person.gender){

    person.children = [];

    let i = utils.getRandomNumber( 1, 4 );

    if ( i === 0 ){
      person.children = "no children";
    }
    else {

      for (i; i > 0; i -- ){

        let child = {};
            child = createPerson("child");
            child.lastName = getFamilySurname(person);
            person.children.push(child);

      }

    }

  }
  else if (person.spouse != "no spouse" && person.spouse.gender === person.gender){

    person.adoptedChildren = [];


    i = spouse.relationshipLength;

    for (i; i > 0; i -- ){

      let child = {};
          child = createPerson("child");
          child.lastName = getFamilySurname(person);
          person.adoptedChildren.push(child);

  }

}
  else{
    person.children = "no children"
  }
    return person;
}



var getFamilySurname = (person) => {

  let familySurname = undefined;

  if (person.gender === "male"){

    return person.lastName;

  }
  else if (person.gender === "female"){

    return person.spouse.lastName;

  }

  return familySurname;
}

// person construtor

var newPerson = (ageCat) => {

  let person = {};

  person.status = "alive";
  getGender(person);
  createName(person);
  createAge(person, ageCat);
  getMaritalStatus(person);
  getHeight(person);
  getOccupation(person);
  createFeatures(person);
  getTraits(person);
  createSpouse(person);
  createChild(person)

  return person;

}

var createPerson = (category) => {

  if (category === undefined) {

    return newPerson(utils.getRandomItem(ages));

  }
  else {

    switch (true) {
      case category === "infant":return newPerson("infant");break;
      case category === "child" :return newPerson("child");break;
      case category === "youth" :return newPerson("youth");break;
      case category === "adult" :return newPerson("adult");break;
      case category === "senior":return newPerson("senior");break;

      default: return "unable to create person object, supllied arguemtn is not valid";

    }
  }
}




var createMultiplePeople = (number) =>{
  group = [];

  for (number; number > 0; number --){
    group.push(createPerson())
  }
  return group;
}

// tempPerson = createPerson("adult")
//
// fs.writeFile('export.txt', JSON.stringify(tempPerson, undefined, 2), (err) => {
//   if (err) throw err;
//
//   console.log("-saved-")
//   console.log(tempPerson)
// })



// console.log(JSON.stringify(createMultiplePeople(100), undefined, 2))
// console.log(newPerson());

exports.createPerson = createPerson;
