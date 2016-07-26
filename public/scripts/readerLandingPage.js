angular.module('myApp').controller('readerLandingPageCtrl',
['$scope', '$http', '$rootScope', '$location', 'userData',
function ($scope, $http, $rootScope, $location, userData) {

  // uncomment this if you want only authorized users access this page
  userData.checkAuth();


  $rootScope.stories = [];
  // var storyObj = {
  //   title: $scope.story_title,
  //   image: $scope.story_cover
  // };
  event.preventDefault();
  console.log("show story in readerLandingPage");
  //example GET for appending stories into library
  $scope.getAllStories = function(){
    console.log("button clicked");
    $http({
      method: 'GET',
      url: '/getStories',
      }).then(function(response){
        $rootScope.stories = response.data;
        console.log(response.data);
      }); // end http GET
  }; // end getUsers

  }]);//end of libraryCtrl controller
