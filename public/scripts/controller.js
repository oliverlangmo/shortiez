var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngMaterial', 'xeditable']);

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
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
      .when('/userLibrary', {
          templateUrl: '/views/pages/userLibrary.html',
      })
      .when('/viewLibrary', {
          templateUrl: '/views/pages/viewLibrary.html',
      })
      .when('/adminEdit', {
          templateUrl: '/views/pages/adminEdit.html',
      })
      .when('/adminLibrary', {
          templateUrl: '/views/pages/adminLibrary.html'
      })
      .when('/textPopup', {
          templateUrl: '/views/pages/textPopup.html'
      })
      .when('/chooseName', {
          templateUrl: '/views/pages/chooseName.html'
      })
      .when('/adminAddNewStory', {
          templateUrl: '/views/pages/adminAddNewStory.html'
      })
      .when('/userStats', {
          templateUrl: '/views/pages/userStats.html'
      })
      .otherwise({
      redirectTo: '/login'
    }); // end $routeProvider

  myApp.run(function(editableOptions) {  // <-- for xeditibles
    editableOptions.theme = 'bs3';
  }); // end editableOptions

}]); // end myApp

//-----------------------------------------  userData factory-----------------------------------------

myApp.factory('userData', ['$http', '$rootScope', '$location', function($http, $rootScope, $location) {

  $rootScope.userAdminCheck = sessionStorage.getItem('userPermissionAdmin');
  $rootScope.userAuthCheck = sessionStorage.getItem('userAuthPermission');
  $rootScope.tempIndex = 0;
  $rootScope.userIndex = '';
  $rootScope.saveStoryArray = [];
  $rootScope.usersArray = [];
  $rootScope.wordByElementId = ''; // needed for modal textPopup
  $rootScope.tempIdNum = 0; // needed for modal textPopup
  $rootScope.pageIndex = 0; // needed for modal textPopup
  $rootScope.characters = []; // needed for modal textPopup
  $rootScope.nameChangeArray = []; // needed for modal textPopup
  $rootScope.page = [];
  $rootScope.tempPageId = '';
  $rootScope.storyArrayIndex = 0;

  var adminCheck = function() {
    var check = $rootScope.userAdminCheck;
    if (check === false || check === 'false' || check === undefined || check === null || check === '') {
      $location.path('/#/adminLibrary');
    } // end if
  }; // end adminCheck

  var checkAuth = function() {
    var check = $rootScope.userAuthCheck;
    if (check === false || check === 'false' || check === undefined || check === null || check === '') {
      $location.path('/#/viewLibrary');
    } // end if
  }; // end checkAuth

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

  var getAllStories = function() {
    $http({
      method: 'GET',
      url: '/getStories',
      }).then(function(response) {
        $rootScope.stories = response.data;
      }); // end http GET
  }; // end getStories

  return {
    adminCheck: adminCheck,
    checkAuth: checkAuth,
    randomId: randomId,
    randomNum: randomNum,
    getAllStories: getAllStories
  }; // end return

}]);
