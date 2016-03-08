  var users = require('../controllers/users.js');
  var topics = require('../controllers/topics.js');
  var posts = require('../controllers/posts.js');
  var comments = require('../controllers/comments.js');

  module.exports = function(app) {
    app.post('/create', function (req,res){
      users.create(req, res)
    }),
    app.post('/login', function (req,res){
      console.log(req.body.email, "Printing Email ID")
      users.login(req,res)
    }),
    app.post('/create_topic', function (req,res){
      topics.create(req, res)
    }),
    app.get('/topics', function (req, res) {
      topics.show(req, res)
    }),
    app.post('/gettopic', function (req, res){
      topics.gettopic(req, res)
    }),
    app.post('/get_user', function (req, res){
      console.log(req.body.name, "Inside Routes")
      users.get_user(req, res)
    }),
    app.post('/create_post', function (req, res){
      posts.add_post(req,res);
    }),
    app.post('/create_comment', function (req, res){
      comments.add_comment(req,res);
    }),
    app.post('/up_vote', function (req, res){
      posts.up_vote(req, res);
    }),
    app.post('/down_vote', function (req, res){
      posts.down_vote(req, res);
    })  
};