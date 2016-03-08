var mongoose = require('mongoose');
var Schema = mongoose.Schema;
bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  name: String,
  username: { type: String, required: true, index: { unique: true } },
  email: String,
  password:  { type: String, required: true },
  created_at: Date,
  topics: [{type: Schema.Types.ObjectId, ref: 'Topic'}],
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});


UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

mongoose.model('User', UserSchema);

