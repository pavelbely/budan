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

(function() {
    let post = JSON.parse(fs.readFileSync('lastPost.json', 'utf8'));

    WallService.getPosts(
            '',
            '')
        .then((posts) => {
            console.log(posts);
            return Promise.all(posts.items.map(post => postToCommentsPromises(post)))
        })
        .then((comments) => {
            // console.log(results);
            let result = comments.reduce((acc, postComments) => acc.concat(postComments.items), [])
                .filter(comment => comment.likes.user_likes === 1)
                .reduce((acc, comment) => {
                    const userId = comment.from_id;
                    if (userId in acc) {
                        acc[userId] += 1;
                    } else {
                        acc[userId] = 1;
                    }
                    return acc;
                }, {});

        })
        .catch((error) => console.log(error));

})();

function postToCommentsPromises(post) {
    console.log(post);
    return WallService.getComments(
        '',
        '',
        post.id);
}
