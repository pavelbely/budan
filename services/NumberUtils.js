'use strict'

module.exports.parseNumber = function(str, regex) {
  let result = str.match(regex)[1];
  if (!isNaN(result)) {
    return parseInt(result);
  }
  result = str.match(/\d+/);
  if (!isNaN(result)) {
    return parseInt(result);
  }
  return NaN;
}
