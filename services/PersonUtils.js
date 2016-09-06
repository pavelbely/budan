"use strict"

const NumberUtils = require('./NumberUtils.js');

module.exports.countPerson = function (comments) {
  if (comments == null || comments.length == 0) {
    let errorMessage = "Нет комментов :(";
    console.error(errorMessage);
    throw new Error(errorMessage);
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
    let errorMessage = "Что, ни единого участника? :(";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  return personCount;
}
