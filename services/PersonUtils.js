"use strict"

const NumberUtils = require('./NumberUtils.js');

module.exports.countPerson = function (comments) {
  if (comments == null || comments.length == 0) {
    console.error("Няма каментаў :(");
    throw new Error("Няма каментаў :(");
  }

  let personCount = comments.map(function(comment) {
      return NumberUtils.parseNumber(comment.text);
    })
    .filter(function(element) {
      return !isNaN(element);
    })
    .reduce(function (a, b) {
      return a + b;
    });

  if (personCount == 0 || personCount === undefined) {
    console.error("Што, ніводнага перса?");
    throw new Error("Што, ніводнага перса?");
  }

  return personCount;
}
