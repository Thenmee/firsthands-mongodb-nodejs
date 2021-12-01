const Tweet = require('../model/TweetSchema');
const { handleErrors } = require('../config/errorsHandler');

const getAllTweets = (req, res) => {
    Tweet.find()
        .then(tweets => { 
            res.render('homepage', { pageTitle: 'Home page', tweets })
        })
        .catch(err => {
            console.log(err)
            res.render('page404', { pageTitle: '404' })
        }
        )
}

const addNewTweet = (req, res) => {
    if (req.method === 'GET') {
        res.render('newTweet', { pageTitle: 'Add Tweet', errors: null })
    };

    if (req.method === 'POST') {
     
        const tweet = new Tweet({ ...req.body, createdAt: +new Date()  });
        tweet.save()
            .then(() => {
                res.redirect('/tweet')
            })
            .catch(err => {
                // const errors = {};
                // Object.values(err.errors).forEach( error => {
                //     errors[error.properties.path] = error.properties.message;
                // }) 
                const errors = handleErrors(err)
                res.render('newTweet', { pageTitle: 'Add Tweet', errors })
            })
    };
}

const showOne = (req, res) => {
    Tweet.findById(req.params.id)
        .then(tweet => { 
            res.render('showTweet', { pageTitle: 'Show Tweet', tweet})
        })
        .catch(err => console.log(err))
}

const updateTweet = (req, res) => {
    if (req.method === 'GET') {
        Tweet.findById(req.params.id)
            .then(result => {
                res.render('updateForm', { pageTitle: 'Edit Tweets', result, errors: null })
            })
            .catch(err => console.log(err))
    };
    if (req.method === 'POST') {
        Tweet.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
            .then(() => res.redirect('/tweet/'+req.params.id))
            .catch(err => {
                // const errors = {};
                // Object.values(err.errors).forEach( error => {
                //     errors[error.properties.path] = error.properties.message;
                // })
                const errors = handleErrors(err)
                Tweet.findById(req.params.id)
                    .then(result => {
                        res.render('updateForm', { pageTitle: 'Edit Tweets', result, errors })
                    })
                    .catch(err => console.log(err))
            })
    };
}

const deleleTweet = (req, res) => {
    Tweet.findOneAndRemove({ _id: req.params.id })
        .then(() => res.redirect('/tweet'))
        .catch(err => console.log(err))
}

const page404 = (req, res) => {
    res.render('page404', { pageTitle: '404' })
}


module.exports = {
    getAllTweets,
    addNewTweet,
    showOne,
    updateTweet,
    deleleTweet,
    page404
}
