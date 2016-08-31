'use strict';

let moment = require('moment');
moment.locale('ru');

module.exports.getFutureMonthName = function (months) {
  return moment().add(months, "months").format('MMMM')
}

module.exports.getNextPeriod = function () {
  return "(" + this.getFutureMonthName(1) + "-" + this.getFutureMonthName(2) + ")";
}

module.exports.getFutureDateAsString = function (days) {
  return moment().add(days, "days").format('DD.MM.YY');
}
