"use strict";

const config = require('./config.json');
const WallService = require('./services/WallService.js');
const DateUtils = require('./services/DateUtils.js');
const fs = require('fs');
const co = require('co');

co(function* () {
  let message = config.announcementMessage
    .replace("%NEXT_PERIOD%", DateUtils.getNextPeriod())
    .replace("%ANSWER_DEADLINE%", DateUtils.getFutureDateAsString(config.daysToAnswerDeadline));

  let postId = yield* WallService.post(config.vkAccessToken,
    config.vkGroupOwnerId,
    config.postOnBehalfOfGroup,
    message);

  let post = {
    id : postId,
    date : new Date()
  }

  fs.writeFile('lastPost.json', JSON.stringify(post), function (err) {
    if (err) throw err;
    console.log('Post saved!');
  });
});
