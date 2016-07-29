var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngMaterial', 'xeditable']);

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
      .when('/adminTest', {
        templateUrl: '/views/pages/adminTest.html',
      })
      .when('/libraryAdmin', {
          templateUrl: '/views/pages/libraryAdmin.html',
      })
      .when('/adminAddStory', {
          templateUrl: '/views/pages/adminAddStory.html',
      })
      .when('/adminPagesCharInput', {
          templateUrl: '/views/pages/adminPagesCharInput.html',
      })
      .when('/readerLandingPage', {
          templateUrl: '/views/pages/readerLandingPage.html',
      })
      .when('/viewLibrary', {
          templateUrl: '/views/pages/viewLibrary.html'
      })
      .when('/textPopup', {
          templateUrl: '/views/pages/textPopup.html'
      })
      .otherwise({
      redirectTo: '/login'
    }); // end $routeProvider

  myApp.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  }); // end editableOptions
}]); // end myApp

//-----------------------------------------  userData factory-----------------------------------------

myApp.factory('userData', ['$http', '$rootScope', '$location', function($http, $rootScope, $location){

  $rootScope.usersArray = [];
  $rootScope.userAdminCheck = sessionStorage.getItem('userPermissionAdmin');
  $rootScope.userAuthCheck = sessionStorage.getItem('userAuthPermission');
  $rootScope.newTextArray = [];
  $rootScope.saveStoryArray = [];
  $rootScope.wordByElementId = '';
  $rootScope.tempIndex = '';

  var adminCheck = function() {
    var check = $rootScope.userAdminCheck;
    if(check === false || check === 'false' || check === undefined || check === null || check === ''){
      $location.path('/#/login');
    } // end if
  }; // end userCheck

  var checkAuth = function() {
    var check = $rootScope.userAuthCheck;
    if(check === false || check === 'false' || check === undefined || check === null || check === ''){
      $location.path('/#/login');
    } // end if
  }; // end checkAuth

  // var getUsers = function() {
  //   $http({
  //     method: 'GET',
  //     url: '/getUsers', }).then(function(response){
  //       $rootScope.usersArray = response.data;
  //     }); // end http GET
  // }; // end getUsers

  var randomId = function() {
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

  var getAllStories = function(){
    console.log("button clicked");
    $http({
      method: 'GET',
      url: '/getStories',
      }).then(function(response){
        $rootScope.stories = response.data;
        console.log(response.data);
      }); // end http GET
  }; // end getStories

  return {
    adminCheck: adminCheck,
    checkAuth: checkAuth,
    // getUsers: getUsers,
    randomId: randomId,
    randomNum: randomNum,
    getAllStories: getAllStories
  }; // end return

}]);
