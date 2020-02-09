"use strict";

const config = require('../config.json');
const superagent = require('superagent');
const querystring = require('querystring');

module.exports.getUsers = async function (accessToken, user_ids) {
  let url = buildGetUsersUrl(accessToken, user_ids);
  let res = await superagent.get(url);
  let body = res.body;
  return body.response;
}

function buildGetUsersUrl(accessToken, user_ids) {
  var origin = config.vkMethodEndpoint + config.vkUsersGetMethod;
  var query = {
    access_token : [accessToken],
    user_ids,
    fields: ['photo_max', 'screen_name', 'followers_count'],
    v : ["5.53"]
  };
  return buildUrl(origin, query);
}

function buildUrl(origin, query) {
  const params = Object.keys(query)
    .map(key => `${key}=${query[key].join(',')}`)
    .join('&');
  return origin + params;
}
