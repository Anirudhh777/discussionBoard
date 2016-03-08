var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
 return {
  login: function(req, res) {
     User.findOne({email: req.body.email}, function(err, user) {
       if(user === null) {
          var error = "User not found"
          console.log(error);
          res.redirect('/');
       }
       else{
        user.comparePassword(req.body.password, function(err, isMatch){
          if(isMatch){
              console.log(user)
              res.json(user);
            }
            else{
              var error = "Password Incorrect"
              console.log(error);
              res.redirect('/');
            }
        })
       }
     })
  },
   create: function(req, res) {
  var user = new User({name: req.body.name, username:req.body.username, email:req.body.email, password:req.body.password, created_at: req.body.created_at});
  user.save(function(err) {
    if(err) {
      console.log('something went wrong');
    } else { 
      console.log('successfully added a user!');
      res.redirect('/');
    }
  })
  },
  get_user: function(req, res){
    User.find({name: req.body.name}).populate('topics').populate('posts').populate('comments').exec(function (err, user){
      if(err){
        res.json(err)
      }else{
        res.json(user);
      }
    })
  }
 }
})();

// if(user.password === req.body.password){
//           console.log(user, "Backend")
//           res.json(user);
//        }else {
//           var error = {name: "Email Id and Password dont Match"}
//           res.json(error);
//           console.log(error);
//        }
//    })