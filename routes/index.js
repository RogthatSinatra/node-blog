const express = require('express');
var router = express.Router();
const mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

/*GET home page */

router.get('/', (req, res, next) => {
    var db = req.db;
    var posts = db.get('posts');
    posts.find({}, {}, (err, posts) => {
        res.render('index', {title: 'Home', posts: posts,  message: req.flash('success')});
    });
    
});

function ensureAuthenticated( req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/users/login');
}

module.exports = router;