var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);
console.log('in controller page');

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
      .when('/genericMain', {
          templateUrl: '/views/pages/genericMain.html',
      })
      .when('/login', {
          templateUrl: '/views/pages/login.html',
      })
      .when('/loginFail', {
          templateUrl: '/views/pages/loginFail.html',
      })
      .when('/register', {
          templateUrl: '/views/pages/register.html',
      })
      .when('/registerFail', {
          templateUrl: '/views/pages/registerFail.html',
      })
      .when('/libraryAdmin', {
          templateUrl:'/views/pages/libraryAdmin.html',
      })
      .otherwise({
      redirectTo: '/login'
      });
}]); // end $routeProvider

//-----------------------------------------  userData factory-----------------------------------------

myApp.factory('userData', ['$http', '$rootScope', function($http, $rootScope){

  $rootScope.usersArray = [];

  var getUsers = function(){
    $http({
      method: 'GET',
      url: '/getUsers', }).then(function(response){
        $rootScope.usersArray = response.data;
      }); // end http GET
  }; // end getUsers

  var randomId = function(){
    var text = [];
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var idLength = 9;
    for(var i=0; i < idLength; i++)
      text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    return text.join('');
  }; // end randomId

  var randomNum = function (max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }; // end randomNum

  return {
    getUsers: getUsers,
    randomId: randomId,
    randomNum: randomNum
  }; // end return

}]);
