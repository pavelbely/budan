"use strict";

const config = require('./config.json');
const WallService = require('./services/WallService.js');
const DateUtils = require('./services/DateUtils.js');
const NumberUtils = require('./services/NumberUtils.js');
const PersonUtils = require('./services/PersonUtils.js');
const CurrencyRatesService = require('./services/CurrencyRatesService.js');
const fs = require('fs');
const co = require('co');

co(function* () {
  let post = JSON.parse(fs.readFileSync('lastPost.json', 'utf8'));

  let comments = yield* WallService.getComments(config.vkAccessToken,
    config.vkGroupOwnerId,
    post.id);

  let personCount = PersonUtils.countPerson(comments);

  let currencyRate = yield* CurrencyRatesService.getCurrencyRate(config.currency);

  let message = config.resultMessage
    .replace("%MEMBER_COUNT%", personCount)
    .replace("%MEMBER_SHARE%", Math.ceil(config.total / personCount * currencyRate * 100) / 100);

  let postId = yield* WallService.post(config.vkAccessToken,
    config.vkGroupOwnerId,
    config.postOnBehalfOfGroup,
    message);
  console.log("Адказ на пост таксама апублікаваны!")
});
