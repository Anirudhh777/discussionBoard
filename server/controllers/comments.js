var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

module.exports = (function() {
	return {
		add_comment: function(req, res) {
			User.findOne({_id: req.body.user_id}, function (err, user){
				Post.findOne({_id: req.body.post_id}).populate('comments').exec(function (err, post){
					var comment = new Comment(req.body);
					comment._User = User._id;
					user.comments.push(comment);
					comment._post = Post._id;
					post.comments.push(comment);
					comment.save(function (err){
					user.save(function (err){
					post.save(function (err){
						if(err){
							console.log("Error");
							res.json(err)
						}else{
							console.log("Succesfully Added Comment");
							res.redirect('/gettopic');
						}
					})
					})
					})
				})
			})
		}

	}
})()