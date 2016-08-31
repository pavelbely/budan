"use strict";

const config = require('./config.json');
const WallService = require('./services/WallService.js');
const DateUtils = require('./services/DateUtils.js');
const NumberUtils = require('./services/NumberUtils.js');
const fs = require('fs');
const co = require('co');

co(function* () {
  let post = JSON.parse(fs.readFileSync('lastPost.json', 'utf8'));

  let comments = yield* WallService.getComments(config.vkAccessToken,
    config.vkGroupOwnerId,
    post.id);

  let personCount = comments.map(function(comment) {
      return NumberUtils.parseNumber(comment.text);
    })
    .filter(function(element) {
      return !isNaN(element);
    })
    .reduce(function (a, b) {
      return a + b;
    });
    console.log(personCount);

  let message = config.resultMessage
    .replace("%MEMBER_COUNT%", personCount)
    .replace("%MEMBER_SHARE%", config.totalPayment / personCount);
  console.log(message);

  let postId = yield* WallService.post(config.vkAccessToken,
    config.vkGroupOwnerId,
    config.postOnBehalfOfGroup,
    message);
});





// http://www.nbrb.by/API/ExRates/Rates/145?onDate=2016-7-6&Periodicity=0
