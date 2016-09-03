"use strict";

const request = require('koa-request');
const DateUtils = require('./DateUtils.js');

module.exports.getCurrencyRate = function* (sourceCurrency) {
  const url = "http://www.nbrb.by/API/ExRates/Rates/" + sourceCurrency + "?onDate=" + DateUtils.todayAsString();
  let res = yield request(url);
  return JSON.parse(res.body).Cur_OfficialRate;
}
