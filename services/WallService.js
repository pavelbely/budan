"use strict";

const config = require('../config.json');
const request = require('koa-request');
const superagent = require('superagent');
const querystring = require('querystring');

module.exports.postOnWall = function*(accessToken, ownerId, postOnBehalfOfGroup, message) {
    let url = buildPostUrl(accessToken, ownerId, postOnBehalfOfGroup, message);
    console.log(url);
    let res = yield request(url);
    console.log(JSON.parse(res.body));
    return JSON.parse(res.body).response.post_id;
}

module.exports.getComments = async function(accessToken, ownerId, postId) {
    let url = buildGetCommentsUrl(accessToken, ownerId, postId);
    let res = await superagent(url);
    console.log(res);
    return JSON.parse(res.body).response;
}

module.exports.buildGetCommentsUrl = buildGetCommentsUrl;

module.exports.getPosts = async function(accessToken, ownerId) {
    let url = buildGetPostsUrl(accessToken, ownerId);
    console.log(url);
    // let res = yield request(url);
    let res = await superagent(url);
    console.log(res.body.response);
    // 

    return res.body.response.items;
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

function buildGetPostsUrl(accessToken, ownerId, postOnBehalfOfGroup, message) {
    var origin = config.vkMethodEndpoint + config.vkWallGetPostsMethod;
    var query = {
        access_token: accessToken,
        owner_id: ownerId,
        v: "5.63"
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
        need_likes: 1,
        extended: 1,
        v: "5.63"
    };
    return buildUrl(origin, query);
}

function buildUrl(origin, query) {
    return origin + querystring.stringify(query);
}
