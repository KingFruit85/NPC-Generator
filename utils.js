
var getRandomNumber = (min, max) => {return Math.floor(Math.random() * (max - min + 1)) + min;};


var getRandomItem = (collection) => {index = getRandomNumber(0, collection.length -1);
    return collection[index];
};

exports.getRandomNumber = getRandomNumber;
exports.getRandomItem   = getRandomItem;
