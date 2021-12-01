const express = require('express');
const controller = require('../controller/controller');


const router = express.Router();

router.get('/tweet', controller.getAllTweets);
router.all('/addTweet', controller.addNewTweet);
router.get('/tweet/:id', controller.showOne);
router.all('/tweet/edit/:id', controller.updateTweet);
router.get('/delete-tweet/:id', controller.deleleTweet);
router.all('/*', controller.page404)

module.exports = router;