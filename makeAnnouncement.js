"use strict";

const config = require('./config.json');
const WallService = require('./services/WallService.js');
const DateUtils = require('./services/DateUtils.js');
const fs = require('fs');
const co = require('co');

co(function* () {
  console.log("hi");
  let message = config.announcementMessage
    .replace("%NEXT_PERIOD%", DateUtils.getNextPeriod(config.periodLengthInMonths))
    .replace("%ANSWER_DEADLINE%", DateUtils.getFutureDateAsString(config.daysToAnswerDeadline));
  console.log(message);


  let postId = yield* WallService.post(config.vkAccessToken,
    config.vkGroupOwnerId,
    config.postOnBehalfOfGroup,
    message);

  let post = {
    id : postId,
    date : new Date()
  }

  console.log(post);

  fs.writeFile('lastPost.json', JSON.stringify(post), function (err) {
    if (err) throw err;
    console.log('Пост опубликован!');
  });
});
