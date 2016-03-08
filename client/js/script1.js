var myapp = angular.module('fullmean_app', ['ngRoute','ngStorage', 'ngMessages']);
	myapp.config(function ($routeProvider) {
		$routeProvider
		.when('/',{     
                templateUrl: 'partials/login.html'
            })
            .when('/dashboard',{
                templateUrl: 'partials/dashboard.html'
            })
            .when('/topics',{
                templateUrl: 'partials/topic.html'
            })
            .when('/users',{
                templateUrl: 'partials/user.html'
            })
            .otherwise({
              redirectTo: '/'
            });
        });

    myapp.factory('userFactory', function($http, $location, $localStorage, $sessionStorage) {
        var factory = {};
        console.log("Im at the user factory")
        factory.addUser = function(info, callback) {
            $http.post('/create', info).success(function (output){
                callback(output);
            })
          }

          factory.get_User = function(info, callback) {
            console.log("inside get_user factory");
            $http.post('/get_user', info).success(function (output){
                callback(output);
            })
          }
          return factory;
    });

    myapp.factory('topicFactory', function($http, $location, $localStorage, $sessionStorage) {

         var factory = {};

        factory.addTopic = function(info, callback) {
             console.log("Im at the add topic factory")
            $http.post('/create_topic', info).success(function (output){
                callback(output);
            })
          }

          factory.getTopics = function(callback){
            $http.get('/topics').success(function(output) {
                callback(output);
            })
          }

          factory.get_Topic = function(info, callback){
            console.log("get_topic factory");
            $http.post('/gettopic', info).success(function(output) {
                callback(output);
            })
          }

          return factory;
    }); 

    myapp.factory('loginFactory', function($http, $location, $localStorage, $sessionStorage) {

        var factory = {};
        factory.getUser = function(info, callback) {
            console.log("logging info")
            $http.post('/login', info).success(function(output){
                callback(output);
            })
          }
          return factory;
    });



    myapp.controller('userController', function($scope, userFactory, topicFactory, $localStorage, $sessionStorage, $location) {

        console.log("Entered User Controller");

        $scope.addUser = function() {      
        console.log("Im at the controller") 
            var user_repack ={
                name: $scope.new_user.name,
                username: $scope.new_user.username,
                email: $scope.new_user.email,
                password: $scope.new_user.password,
                created_at: new Date()
            }
            userFactory.addUser(user_repack, function(data) {
                     $scope.users = data;
                      $scope.new_user = {};    
            });
        }
    })

    myapp.controller('loginController', function($scope, $rootScope, loginFactory, $localStorage, $sessionStorage, $location) {

            $scope.getUser = function(){
            console.log("Entered getUser controller")
            var user_repack = {
                email: $scope.user.email,
                password: $scope.user.password
            }
            loginFactory.getUser(user_repack, function(data){
                $location.path('/dashboard')
                $rootScope.users = data
            });
        }

        $scope.logout = function(){
            console.log("Logged out");
            for (var i in $rootScope) {
                if (i.substring(0,1) !== '$') {
                    delete $rootScope[i];
                }
            }
            $location.path('/')
        }
    })

    myapp.controller('topicController', function($scope, topicFactory, $localStorage, $sessionStorage, $rootScope, userFactory) {

        topicFactory.getTopics(function(data) {
            $scope.topics = data;
        })

        $scope.addTopic = function(input, data){
            var topic_repack = {
                topic: $scope.new_topic.topic,
                description: $scope.new_topic.description,
                category: $scope.new_topic.category,
                user_name: data,
                post_count: 0,
                user_id: input
            }
            console.log(topic_repack);
            topicFactory.addTopic(topic_repack, function(data){
                $scope.topics = data;
                $scope.new_topic = {}; 
            });
        }

        $scope.get_Topic = function (input){
            var topic_repack = {
                _id : input
            }
            topicFactory.get_Topic (topic_repack, function(data){
                $rootScope.topic = data
                console.log($rootScope.topic);
            })
        }

        $scope.get_User = function (input){
            var user_repack = {
                name : input
            }
            userFactory.get_User(user_repack, function(data){
                $rootScope.user = data
            })
        }
     })