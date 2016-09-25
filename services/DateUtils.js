"use strict";

const config = require('../config.json');

let moment = require('moment');
moment.locale(config.locale);

let getFutureMonthName = function (months) {
  return moment().add(months, "months").format('MMMM')
}

module.exports.getNextPeriod = function (periodLengthInMonths) {
  if (periodLengthInMonths <= 1) {
    return "(" + getFutureMonthName(1) + ")";
  }
  return "(" + getFutureMonthName(1) + "-" + getFutureMonthName(periodLengthInMonths) + ")";
}

module.exports.getFutureDateAsString = function (days) {
  return moment().add(days, "days").format('DD.MM.YY');
}

module.exports.todayAsString = function (format) {
  return moment().format(format);
}
