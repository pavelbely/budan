"use strict";

const config = require('../config.json');
const superagent = require('superagent');
const querystring = require('querystring');

module.exports.post = async function (accessToken, ownerId, postOnBehalfOfGroup, message) {
  let url = buildPostUrl(accessToken, ownerId, postOnBehalfOfGroup, message);
  let res = await request(url);
  return JSON.parse(res.body).response.post_id;
}

module.exports.getMembers = async function (accessToken, ownerId, page) {
  let url = buildGetMembersUrl(accessToken, ownerId, page);
  let res = await superagent.get(url);
  let body = res.body;
  return body.response.items;
}

function buildGetMembersUrl(accessToken, groupId, page) {
  var origin = config.vkMethodEndpoint + config.vkGroupGetMembersMethod;
  var query = {
    access_token : accessToken,
    group_id: groupId,
  	//post_id : postId,
    count : 100,
    offset: page * 100,
    v : "5.53"
  };
  return buildUrl(origin, query);
}

function buildUrl(origin, query) {
  return origin + querystring.stringify(query);
}
