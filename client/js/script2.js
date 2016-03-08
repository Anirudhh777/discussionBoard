myapp.factory('postFactory', function($http, $location, $localStorage, $sessionStorage) {

        var factory = {};
        
        factory.addPost = function(info, callback) {
            $http.post('/create_post', info).success(function (output){
                callback(output);
            })
        }

        factory.upVote = function(info, callback) {
            $http.post('/up_vote', info).success(function (output){
                callback(output);
            })
        }

        factory.downVote = function(info, callback) {
            $http.post('/down_vote', info).success(function (output){
                callback(output);
            })
        }
        return factory;
    });



myapp.controller('postController', function($scope, $rootScope, postFactory, $localStorage, $sessionStorage, $location) {
    
        $scope.addPost = function(input, input1, input2) {
            var post_repack = {
                post: $scope.new_post.post,
                user_name: input2,
                user_id: input,
                topic_id: input1,
                up_vote: 0,
                down_vote:0,
                created_at: new Date()
            }
            postFactory.addPost(post_repack, function (data) {
                $rootScope.posts = data
                $scope.new_post = {};  
            })
        }

        $scope.upVote = function(input){
            var vote_repack = {
                post_id: input,
                up_vote: 1
            }
            postFactory.upVote(vote_repack, function (data){
                $rootScope.upvote = data;
            });
        }

        $scope.downVote = function(input){
            var vote_repack = {
                post_id: input,
                down_vote: 1
            }
            postFactory.downVote(vote_repack, function (data){
                $rootScope.downvote = data;
            });
        }
    })

myapp.factory('commentFactory', function($http, $location, $localStorage, $sessionStorage) {

        var factory = {};
        
        factory.addComment = function(info, callback) {
            $http.post('/create_comment', info).success(function (output){
                callback(output);
            })
        }
        return factory;
    });



myapp.controller('commentController', function($scope, commentFactory, $rootScope) {
    
        $scope.addComment = function(userId, postId, username) {
            var comment_repack = {
                comment: $scope.model.comment,
                user_name: username,
                user_id: userId,
                post_id: postId,
                created_at: new Date()
            }
            commentFactory.addComment(comment_repack, function(data) {
                $rootScope.comment = data
                $scope.new_post = {};  
            })

        }
    })