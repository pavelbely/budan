"use strict";

const config = require('./config.json');
const WallService = require('./services/WallService.js');
const DateUtils = require('./services/DateUtils.js');
const fs = require('fs');
const co = require('co');

co(function* () {
  let message = config.announcementMessage
    .replace("%NEXT_PERIOD%", DateUtils.getNextPeriod(config.periodLengthInMonths))
    .replace("%ANSWER_DEADLINE%", DateUtils.getFutureDateAsString(config.daysToAnswerDeadline));

  let postId = yield* WallService.post(process.env.VK_ACCESS_TOKEN,
    process.env.VK_GROUP_OWNER_ID,
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
