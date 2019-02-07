const bodyParts =require('./bodyParts.js');
const clothes =require('./clothes.js');
const descriptors =require('./descriptors.js');
const names =require('./names.js');
const occupation =require('./occupations.js');


var getRandomNumber = (min, max) => {return Math.floor(Math.random() * (max - min + 1)) + min;};


var getRandomItem = (collection) => {
    index = getRandomNumber(0, collection.length -1);
    return collection[index];
};


var createName = (gender) => {
  if (gender === "male"){
    fullName ={};
    fullName.firstName = getRandomItem(names.maleNames);
    fullName.lastNames = getRandomItem(names.lastNames);
    return fullName;
  }
  else if (gender === "female"){
    fullName = {};
    fullName.firstName = getRandomItem(names.femaleNames);
    fullName.lastNames = getRandomItem(names.lastNames);
    return fullName;
  }
  else return "Invalid Gender Supplied"
}


var createAge = () => {
  age = {};
  age.ageValue = getRandomNumber(1,80);

  switch (true) {
    case ( age.ageValue === 1 )                    :age.category = "infant";break;
    case ( age.ageValue >1 && age.ageValue <15 )   :age.category = "child";break;
    case ( age.ageValue > 14 && age.ageValue < 25 ):age.category = "youth";break;
    case ( age.ageValue > 24 && age.ageValue < 65 ):age.category = "adult";break;
    case ( age.ageValue > 64 )                     :age.category = "senior";break;
    default: age.category = "Fell though switch case statement"
    break;
  }
  return age;
}


var createFeatures = () =>{
  features = {};
  features.eyeColour = getRandomItem(["brown","hazel","blue", "green","silver","amber"]);
  features.hairColour = getRandomItem(["brown","blond","black","auburn","red","gray","white"]);
  features.hairLength = getRandomItem(["short","long","medium"]);
  features.skinTone = getRandomItem(["pale white", "fair", "light brown","olive","brown","dark brown","black"]);

  return features;
}


var getHeight = (age) => {
  height = {};
  switch (true) {
    case ( age === 1 )           : height.feet = 1; height.inches = getRandomNumber( 0 , 7 );break;
    case ( age > 1 && age < 4 )  : height.feet = 2; height.inches = getRandomNumber( 6 , 11 );break;
    case ( age > 3 && age < 9 )  : height.feet = 3; height.inches = getRandomNumber( 1 , 11 );break;
    case ( age > 8  && age < 13) : height.feet = 4; height.inches = getRandomNumber( 1 , 11 );break;
    case ( age > 12 && age < 16 ): height.feet = 5; height.inches = getRandomNumber( 1 , 8 );break;
    case ( age > 16 )            : height.feet = getRandomNumber( 5 , 6); height.inches = getRandomNumber( 1 , 11 );break;
    default:"Fell though switch case statement"
  }
  return height
}


var getOccupation = (age) => {
  var profession = "";
  if (age < 15) {
    profession = "unemployed"
  }
  else{
    profession = getRandomItem(occupation.occupation);
  }
  return profession;
}


var getMaritalStatus = (age) => {
  maritalStatus = "";
  if (age < 15) {maritalStatus = "single";}
  else {maritalStatus = getRandomItem(["single", "in a relationship", "married"]);}
  return maritalStatus;
}


var createPerson = () => {
  person = {};
  person.gender = getRandomItem(["male", "female"]);
  person.name = createName(person.gender);
  person.age = createAge();
  person.maritalStatus = getMaritalStatus(person.age.ageValue);
  person.height = getHeight(person.age.ageValue);
  person.occupation = getOccupation(person.age.ageValue);
  person.features = createFeatures();

  return person;
}

// console.log(createPerson())
console.log(JSON.stringify(createPerson(), undefined, 2))
exports.getRandomNumber = getRandomNumber;
exports.getRandomItem = getRandomItem;
