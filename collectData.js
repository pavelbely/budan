"use strict";

const config = require('./config.json');
const WallService = require('./services/WallService.js');
const GroupService = require('./services/GroupService');
const UserService = require('./services/UserService');
const DateUtils = require('./services/DateUtils.js');
const NumberUtils = require('./services/NumberUtils.js');
const PersonUtils = require('./services/PersonUtils.js');
const CurrencyRatesService = require('./services/CurrencyRatesService.js');
const fs = require('fs');
const converter = require('json-2-csv');

async function main() {
  let post = JSON.parse(fs.readFileSync('lastPost.json', 'utf8'));

  let result = [];
  for (let i = 0; i < 341; i++) {
    let user_ids = await GroupService.getMembers(config.vkAccessToken,
      config.vkGroupOwnerId,
      i);
    let users = await UserService.getUsers(config.vkAccessToken,
      user_ids);
    result = result.concat(users);
  }

  converter.json2csv(result, (err, csvFile) => {
    console.log(csvFile);

    fs.writeFile('users.csv', csvFile, function (err) {
      if (err) throw err;
      console.log('Пост опубликован!');
    });
  });



  // let personCount = PersonUtils.countPerson(comments);

  // let currencyRate = yield* CurrencyRatesService.getCurrencyRate(config.currency);

  // let message = config.resultMessage
  //   .replace("%MEMBER_COUNT%", personCount)
  //   .replace("%MEMBER_SHARE%", Math.ceil(config.total / personCount * currencyRate * 100) / 100);

  // let postId = yield* WallService.post(config.vkAccessToken,
  //   config.vkGroupOwnerId,
  //   config.postOnBehalfOfGroup,
  //   message);
  console.log("Результирующий пост опубликован!")
}

main();
