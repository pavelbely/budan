"use strict";

const config = require('../config.json');
const request = require('koa-request');
const querystring = require('querystring');

module.exports.post = function*(accessToken, ownerId, postOnBehalfOfGroup, message) {
    let url = buildPostUrl(accessToken, ownerId, postOnBehalfOfGroup, message);
    console.log(url);
    let res = yield request(url);
    console.log(JSON.parse(res.body));
    return JSON.parse(res.body).response.post_id;
}

module.exports.getComments = function*(accessToken, ownerId, postId) {
    let url = buildGetCommentsUrl(accessToken, ownerId, postId);
    let res = yield request(url);
    return JSON.parse(res.body).response.items;
}

function buildPostUrl(accessToken, ownerId, postOnBehalfOfGroup, message) {
    var origin = config.vkMethodEndpoint + config.vkWallPostMethod;
    var query = {
        access_token: accessToken,
        owner_id: ownerId,
        from_group: postOnBehalfOfGroup ? 1 : 0,
        message: message,
        v: "5.53"
    };
    return buildUrl(origin, query);
}

function buildGetCommentsUrl(accessToken, ownerId, postId) {
    var origin = config.vkMethodEndpoint + config.vkWallGetCommentsMethod;
    var query = {
        access_token: accessToken,
        owner_id: ownerId,
        post_id: postId,
        count: 100,
        v: "5.53"
    };
    return buildUrl(origin, query);
}

function buildUrl(origin, query) {
    return origin + querystring.stringify(query);
}
