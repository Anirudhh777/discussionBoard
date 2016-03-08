var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');
var Post = mongoose.model('Post');

module.exports = (function() {
	return {
		add_post: function(req, res) {
			User.findOne({_id: req.body.user_id}, function (err, user){
				Topic.findOne({_id: req.body.topic_id}).populate('posts').exec(function (err, topic){
					var post = new Post(req.body);
					post._User = User._id;
					user.posts.push(post);
					post._Topic = Topic._id;
					topic.posts.push(post);
					post.save(function (err){
					user.save(function (err){
					topic.save(function (err){
						if(err){
							console.log("Error");
							res.json(err)
						}else{
							console.log("Succesfully Added Post");
							res.redirect('/gettopic')
						}
					})
					})
					})
				})
			})
		},
		up_vote: function(req, res){
			Post.findOne({_id: req.body.post_id}, function (err, post){
				post.up_vote = post.up_vote + req.body.up_vote
				post.save(function (err){
					if(err){
						console.log("dint up vote, something went wrong")
					}else{
						console.log("Up vote added")
					}
				})
			})
		},
		down_vote: function(req, res){
			Post.findOne({_id: req.body.post_id}, function (err, post){
				post.down_vote = post.down_vote + req.body.down_vote
				post.save(function (err){
					if(err){
						console.log("dint down vote, something went wrong")
					}else{
						console.log("down vote added")
					}
				})
			})
		}
	}
})()