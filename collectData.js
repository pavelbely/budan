"use strict";

const config = require('./config.json');
const WallService = require('./services/WallService.js');
const DateUtils = require('./services/DateUtils.js');
const NumberUtils = require('./services/NumberUtils.js');
const PersonUtils = require('./services/PersonUtils.js');
const CurrencyRatesService = require('./services/CurrencyRatesService.js');
const fs = require('fs');
const co = require('co');

// console.log(process.env.VK_ACCESS_TOKEN);

co(function*() {
    let post = JSON.parse(fs.readFileSync('lastPost.json', 'utf8'));

    let comments = yield* WallService.getComments('bb71302a1709b38333f83c49aad65299ef855dbf35ffff45da00be92e80fe3ab5c72dd90006d4627ed97c',
        '-127495990',
        post.id);

    let personCount = PersonUtils.countPerson(comments);

    let currencyRate = yield* CurrencyRatesService.getCurrencyRate(config.currency);

    let message = config.resultMessage
        .replace("%MEMBER_COUNT%", personCount)
        .replace("%MEMBER_SHARE%", Math.ceil(config.total / personCount * currencyRate * 100) / 100);

    let postId = yield* WallService.post('bb71302a1709b38333f83c49aad65299ef855dbf35ffff45da00be92e80fe3ab5c72dd90006d4627ed97c',
        '-32836902',
        config.postOnBehalfOfGroup,
        message);
    console.log("Результирующий пост опубликован!")
});
