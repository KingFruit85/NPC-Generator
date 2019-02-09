const bodyParts =require('./bodyParts.js');
const clothes =require('./clothes.js');
const descriptors =require('./descriptors.js');
const names =require('./names.js');
const occupation =require('./occupations.js');
const traits =require('./traits.js');
const death =require('./death.js');


var getRandomNumber = (min, max) => {return Math.floor(Math.random() * (max - min + 1)) + min;};


var getRandomItem = (collection) => {index = getRandomNumber(0, collection.length -1);
    return collection[index];
};

var getGender = (person, gender) => {

  if (gender === undefined){

    x = getRandomNumber(1,2);
    switch (true) {
      case (x === 1):person.gender = "male";break;
      case (x === 2):person.gender = "female";break;
      default:person.gender = "fell though swith case"

  }
}
  else if (gender === "male"){
      person.gender = "male";
  }
  else if (gender === "female"){
    person.gender = "female";
  }
  else{
    person.gender = "invalid gender arguement";
  }
    return person;
  }


var createName = (person) => {
  if (person.gender === "male"){
    person.firstName = getRandomItem(names.maleNames);
    person.lastName  = getRandomItem(names.lastNames);
    return person;
  }
  else if (person.gender === "female"){
    person.firstName = getRandomItem(names.femaleNames);
    person.lastName  = getRandomItem(names.lastNames);
    return person;
  }
  else return "Invalid Gender Supplied"
}

var createAge = (person, category) => {

  if     (category === "infant"){person.age  = 1; person.ageCategory = "infant"}
  else if(category === "child") {person.age  = getRandomNumber( 2 ,  15  ); person.ageCategory = "child";  return person;}
  else if(category === "youth") {person.age  = getRandomNumber( 15 , 24  ); person.ageCategory = "youth";  return person;}
  else if(category === "adult") {person.age  = getRandomNumber( 25 , 64  ); person.ageCategory = "adult";  return person;}
  else if(category === "senior"){person.age  = getRandomNumber( 64 , 107 ); person.ageCategory = "senior"; return person;}
  else if(category === undefined){
    person.age = getRandomNumber( 1, 107 )
    switch (true) {
      case ( person.age === 1 )                  :person.ageCategory = "infant";break;
      case ( person.age >1 && person.age <15 )   :person.ageCategory = "child";break;
      case ( person.age > 14 && person.age < 25 ):person.ageCategory = "youth";break;
      case ( person.age > 24 && person.age < 65 ):person.ageCategory = "adult";break;
      case ( person.age > 64 )                   :person.ageCategory = "senior";break;
      default: age.category = "Fell though switch case statement"
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
    case person.ageCategory === "infant"                              :person.maritalStatus = "single";break;
    case person.ageCategory === "child"                               :person.maritalStatus = "single";break;
    case person.ageCategory === "youth" && person.gender === "male"   :person.maritalStatus = getRandomItem(["single","in a relationship","married","widower"]);break;
    case person.ageCategory === "youth" && person.gender === "female" :person.maritalStatus = getRandomItem(["single","in a relationship","married","widower"]);break;
    case person.ageCategory === "adult" && person.gender === "male"   :person.maritalStatus = getRandomItem(["single","in a relationship","married","widower"]);break;
    case person.ageCategory === "adult" && person.gender === "female" :person.maritalStatus = getRandomItem(["single","in a relationship","married","widower"]);break;
    case person.ageCategory === "senior" && person.gender === "male"  :person.maritalStatus = getRandomItem(["single","in a relationship","married","widower"]);break;
    case person.ageCategory === "senior" && person.gender === "female":person.maritalStatus = getRandomItem(["single","in a relationship","married","widower"]);break;
    default:person.maritalStatus = "fell though switch statement"

  }
  return person;
}

var getTraits = (person) => { //need to create collection in person

  person.positiveTrait = getRandomItem(traits.positiveTraits);
  person.neutralTrait  = getRandomItem(traits.neutralTraits);
  person.badTrait      = getRandomItem(traits.badTraits);

  return person;
}

var getHeight = (person) => {
  person.height = {};
  switch (true) {
    case ( person.age === 1 )                   : person.height.feet = 1; person.height.inches = getRandomNumber( 0 , 7 );break;
    case ( person.age > 1  && person.age < 4 )  : person.height.feet = 2; person.height.inches = getRandomNumber( 6 , 11 );break;
    case ( person.age > 3  && person.age < 9 )  : person.height.feet = 3; person.height.inches = getRandomNumber( 1 , 11 );break;
    case ( person.age > 8  && person.age < 13)  : person.height.feet = 4; person.height.inches = getRandomNumber( 1 , 11 );break;
    case ( person.age > 12 && person.age < 16 ) : person.height.feet = 5; person.height.inches = getRandomNumber( 1 , 8 );break;
    case ( person.age > 16 )                    : person.height.feet = getRandomNumber( 5 , 6); person.height.inches = getRandomNumber( 1 , 11 );break;
    default:"Fell though switch case statement"

  }
  return person
}

var getOccupation = (person) => {

  if (person.age < 15) {person.profession = "unemployed"}
  else{person.profession = getRandomItem(occupation.occupation)}
  return person;

}

var createFeatures = (person) =>{

  person.eyeColour  = getRandomItem(["brown","hazel","blue", "green","silver","amber"]);
  person.hairColour = getRandomItem(["brown","blond","black","auburn","red","gray","white"]);
  person.hairLength = getRandomItem(["short","long","medium"]);
  person.skinTone   = getRandomItem(["pale white", "fair", "light brown","olive","brown","dark brown","black"]);

  return person;
}

var createSpouse = (person) => {

  if (person.ageCategory === "infant" || person.ageCategory === "child" || person.maritalStatus === "single"){
    person.spouse = "no spouse";

    return person;

  }
  else if (person.gender === "male") {

    switch (true) {
      case person.ageCategory === "youth" : person.spouse = createSpousePerson(person, "female");break;
      case person.ageCategory === "adult" : person.spouse = createSpousePerson(person, "female");break;
      case person.ageCategory === "senior": person.spouse = createSpousePerson(person, "female");break;
      default:person.spouse = "fell though switch statement"

      return person;

    }

  }
  else if (person.gender === "female"){

    switch (true) {
      case person.ageCategory === "youth" : person.spouse = createSpousePerson(person, "male");break;
      case person.ageCategory === "adult" : person.spouse = createSpousePerson(person, "male");break;
      case person.ageCategory === "senior": person.spouse = createSpousePerson(person, "male");break;
      default:person.spouse = "fell though switch statement"

      return person;

    }

  }


}

var createSpousePerson = (person, gender) => {

  spouse = {}

  if (person.maritalStatus === "widow" || person.maritalStatus === "widower"){
    spouse.status = "deceased"
    getGender(spouse, gender)
    createName(spouse);
    createAge(spouse, person.ageCategory);
    relationshipLength = getRandomNumber(1 , (spouse.age - 16))
    spouse.relationshipLength = relationshipLength - getRandomNumber(1 , relationshipLength)

    spouse.causesOfDeath = getRandomItem(death.causesOfDeath);


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
    relationshipLength = getRandomNumber(1 , (spouse.age - 16))
    spouse.relationshipLength = relationshipLength - getRandomNumber(1 , relationshipLength)

    if (person.maritalStatus === "married" || person.maritalStatus === "widow" || person.maritalStatus == "widower"){
        spouse.lastName = person.lastName;
    }
  }

  return spouse;

}

//children cannot be older than the mother and the mother cannot have given birth
var createChild = (person) => {

  if (person.spouse != "no spouse" && person.spouse.gender != person.gender){
    person.children = [];
    potentalChildren = Math.floor(((spouse.relationshipLength / 4)))

    for (potentalChildren; potentalChildren > 0; potentalChildren -- ){
      let child = {};
      getGender(child);
      createName(child)
      child.lastName = getFamilySurname(person);
      child.age = getRandomNumber(1 , (person.age - 16));
      person.children.push(child)
    }
    return person;
  }
  else if (person.spouse != "no spouse" && person.spouse.gender === person.gender){

      person.adoptedChildren = [];
      potentalChildren = Math.floor(((spouse.relationshipLength / 4)))

      for (potentalChildren; potentalChildren > 0; potentalChildren -- ){
        let child = {};
        getGender(child);
        createName(child)
        child.lastName = getFamilySurname(person);
        child.age = getRandomNumber(1 , (person.age - 16));
        person.adoptedChildren.push(child)
      }
      return person;
  }
  else{
    person.children = "no children"
  }
  return person
}

var getFamilySurname = (person) => {
  let familySurname = undefined
  if (person.gender === "male"){
    return person.lastName
  }
  else if (person.gender === "female"){
    return person.spouse.lastName
  }
  return familySurname
}


var createPerson = (category) => {

  person = {};
  person.status = "alive";
  // person.status = "alive";

  if (category === undefined){

    getGender(person);
    createName(person);
    createAge(person);
    getMaritalStatus(person);
    getHeight(person);
    getOccupation(person);
    createFeatures(person);
    getTraits(person);

  }
  else if (category === "adult"){

    getGender(person);
    createName(person);
    createAge(person, "adult");
    getMaritalStatus(person);
    getHeight(person);
    getOccupation(person);
    createFeatures(person);
    getTraits(person);


  }
  else if (category === "youth"){

    getGender(person);
    createName(person);
    createAge(person, "youth");
    getMaritalStatus(person);
    getHeight(person);
    getOccupation(person);
    createFeatures(person);
    getTraits(person);

  }
  else if (category === "infant"){

    getGender(person);
    createName(person);
    createAge(person, "infant");
    getMaritalStatus(person);
    getHeight(person);
    getOccupation(person);
    createFeatures(person);
    getTraits(person);

  }
  else if (category == "senior"){

    getGender(person);
    createName(person);
    createAge(person, "senior");
    getMaritalStatus(person);
    getHeight(person);
    getOccupation(person);
    createFeatures(person);
    getTraits(person);

  }
  else if (category === "child"){

    getGender(person);
    createName(person);
    createAge(person, "child");
    getMaritalStatus(person);
    getHeight(person);
    getOccupation(person);
    createFeatures(person);
    getTraits(person);

  }

  createSpouse(person)
  createChild(person)
  return person;

}


var createMultiplePeople = (number) =>{
  group = [];

  for (number; number > 0; number --){
    group.push(createPerson())
  }
  return group;
}

// const fs =require('fs');
//
// fs.writeFile('export.txt', JSON.stringify(createMultiplePeople(100), undefined, 2), (err) => {
//   if (err) throw err;
//
//   console.log("saved")
// })

// xy = createPerson("adult")
// console.log(xy)

// console.log(JSON.stringify(createMultiplePeople(100), undefined, 2))

exports.createPerson = createPerson;