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
      .when('/badWordPopup', {
          templateUrl: '/views/pages/badWordPopup.html'
      })
      .when('/adminAddNewStory', {
          templateUrl: '/views/pages/adminAddNewStory.html'
      })
      .when('/addNewCharPopup', {
          templateUrl: '/views/pages/addNewCharPopup.html'
      })
      .when('/addNewPagePopup', {
          templateUrl: '/views/pages/addNewPagePopup.html'
      })
      .when('/editPagePopup', {
          templateUrl: '/views/pages/editPagePopup.html'
      })
      .when('/editCharactersPopup', {
          templateUrl: '/views/pages/editCharactersPopup.html'
      })
      .when('/editCoverPopup', {
          templateUrl: '/views/pages/editCoverPopup.html'
      })
      .when('/userStats', {
          templateUrl: '/views/pages/userStats.html'
      })
      .otherwise({
      redirectTo: '/login'
    }); // end $routeProvider

}]); // end myApp

//-----------------------------------------  userData factory-----------------------------------------

myApp.factory('userData', ['$http', '$rootScope', '$location', function($http, $rootScope, $location) {

  $rootScope.userAdminCheck = sessionStorage.getItem('userPermissionAdmin');
  $rootScope.userAuthCheck = sessionStorage.getItem('userAuthPermission');
  $rootScope.loggedInUser = sessionStorage.getItem('loggedInUser');
  $rootScope.stories = []; // array that holds all stories from database
  $rootScope.tempNewStoryArray = []; // temporary array holding only newly added story
  $rootScope.tempIndex = 0; // temporarily holds object index ID, very important!
  $rootScope.userIndex = '';
  $rootScope.saveStoryArray = [];
  $rootScope.usersArray = [];
  $rootScope.badWordsArray = [];
  $rootScope.wordByElementId = ''; // needed for modal textPopup
  $rootScope.tempIdNum = 0; // needed for modal textPopup
  $rootScope.pageIndex = 0; // needed for modal textPopup
  $rootScope.characters = []; // needed for modal textPopup
  $rootScope.nameChangeArray = []; // needed for modal textPopup
  $rootScope.page = [];
  $rootScope.tempPageId = ''; // holds object array number/spot
  $rootScope.storyArrayIndex = 0;
  $rootScope.tempStoryName = '';
  $rootScope.isNewOrEdit = 0; // determines whether or not called function is as New (0) or Edit (1)
  $rootScope.userBtns = false; // comment out to turn off authorizations
  $rootScope.adminBtns = false; // comment out to turn off authorizations



  // var adminCheck = function() {
  //   var admin = $rootScope.userAdminCheck;
  //   if (admin === false || admin === 'false' || admin === undefined || admin === null || admin === '') {
  //     var path = "#login";
  //     window.location.href = path;
  //   } // end if
  // }; // end adminCheck

  // determines user's permisson and makes sure other variables are accounted for
  var checkAuth = function() {
    var user = $rootScope.userAuthCheck;
    if (user === false || user === 'false' || user === undefined || user === null || user === '') {
      var path = "#login";
      window.location.href = path;
      console.log('please see me!', $rootScope.userAuthCheck);
    }  // end if
  }; // end checkAuth

  // function to create probalistically unique IDs. Not used in program, but is an option for later use
  var randomId = function() {
    var text = [];
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var idLength = 24;
    for(var i = 0; i < idLength; i++)
      text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    return text.join('');
  }; // end randomId

  // function to create probalistically random numbers. Not used in program, but is an option for later use
  var randomNum = function (max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }; // end randomNum

  // primary function that returns all stories from DB to be stored locally. Needs review
  var getAllStories = function() {
    $http({
      method: 'GET',
      url: '/getStories',
      }).then(function(response) {
        $rootScope.stories = response.data;
      }); // end http GET
  }; // end getStories

  // Returns all bad words to be stored locally then is used to compare new words (madlibs).
  var getBadWords = function() {
    $http({
      method: 'GET',
      url: '/getBadWords', }).then(function(response) {
        $rootScope.badWordsArray = response.data;
    }); // end http GET
  }; // end getUsers

  // based on user permissions, makes certain buttons visible to user
  var setBtnsView = function() {
    if ($rootScope.userAdminCheck === 'false' || $rootScope.userAdminCheck === false) {
      $rootScope.userBtns = true;
    } else {
      $rootScope.userBtns = true;
      $rootScope.adminBtns = true;
    } // end else
  }; // end setBtnsView

  return {
    checkAuth: checkAuth,
    randomId: randomId,
    randomNum: randomNum,
    getAllStories: getAllStories,
    getBadWords: getBadWords,
    setBtnsView: setBtnsView
  }; // end return

}]);
