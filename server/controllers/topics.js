var mongoose = require('mongoose');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');


module.exports = (function() {
 return {
  	create: function(req, res) {
    	User.findOne({_id: req.body.user_id}, function (err, user){
    		var topic = new Topic(req.body);
    		topic._User = User._id;
    		user.topics.push(topic);
    		topic.save(function(err){
    		user.save(function(err){
    			if(err) {
    				console.log("Error"); 
    			}
    			else{
    				console.log("Succesfully added Topic");
    				res.redirect('/topics');
    			}
    		});
    		});
    	});
  	},
    show: function(req, res) {
    Topic.find({}).populate('posts').exec(function (err, topics){
      if(err){
        console.log("SOmething went wrong");
        res.json(err)
      }else{
        res.json(topics);
      }
    })
  },
  gettopic: function(req, res){
    console.log("get_topic query", req.body._id)
    Topic.findOne({_id: req.body._id}).deepPopulate('posts posts.comments').exec(function (err, topic) {
        if(err){
            console.log("Something went Wrong");
            res.json(err)
        }else{
            console.log(topic)
            res.json(topic);
        }
        })
    }
    }
})();


// gettopic: function(req, res){
//     console.log("get_topic query", req.body._id)
//     Topic.findOne({_id: req.body._id}).populate('posts').exec(function (err, topic) {
//         if(err){
//             console.log("Something went Wrong");
//             res.json(err)
//         }else{
//             res.json(topic);
//         }
//         })
//     }