"use strict";

const config = require('../config.json');

let moment = require('moment');
moment.locale(config.locale);

let getFutureMonthName = function (months) {
  return moment().add(months, "months").format('MMMM')
}

module.exports.getNextPeriod = function () {
  return "(" + getFutureMonthName(1) + "-" + getFutureMonthName(2) + ")";
}

module.exports.getFutureDateAsString = function (days) {
  return moment().add(days, "days").format('DD.MM.YY');
}

module.exports.todayAsString = function () {
  return moment().format('YYYY-M-D');
}
