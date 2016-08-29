"use strict";

const config = require('./config.json');
const WallPoster = require('./services/WallPoster.js');
const DateUtils = require('./services/DateUtils.js');
const co = require('co');

let postId;

co(function* () {
  let message = config.message
    .replace("%NEXT_PERIOD%", DateUtils.getNextPeriod())
    .replace("%ANSWER_DEADLINE%", DateUtils.getFutureDateAsString(config.daysToAnswerDeadline));

  // let postId = yield* WallPoster.post(config.vkAccessToken,
  //   config.groupOwnerId,
  //   config.postOnBehalfOfGroup,
  //   config.message);
  let postId = 5;

  console.log(postId);

  let comments = WallPoster.getComments(config.vkAccessToken,
    config.groupOwnerId,
    postId);
  console.log(comments);
  // let musiciansCount = comments.map()
});




// http://www.nbrb.by/API/ExRates/Rates/145?onDate=2016-7-6&Periodicity=0
