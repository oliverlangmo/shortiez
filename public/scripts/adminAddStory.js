myApp.controller('adminAddStoryController',
['$scope', '$http', '$rootScope', '$location', 'userData',
function($scope, $http, $rootScope, $location, userData){

  // uncomment this if you want admins to access this page
  // userData.adminCheck();


  $scope.addStory = function(){ // adds issue on button click
    console.log("addStory hit");
    var storyToCreate ={  // package object to send, with inputs
      story_title: $scope.storyTitleBinder,
      story_cover: $scope.storyCoverBinder,
      story_description: $scope.storyDescrpitionBinder
    }; //end objectToSend
    console.log(storyToCreate, "storyToCreate");
  $http({  // sends object via POST
    method: 'POST',
      url: '/addStory',
      data: storyToCreate
    }); //end $http
      $scope.storyTitleBinder ='';  // clears input boxes
      $scope.storyCoverBinder ='';
      $scope.storyDescrpitionBinder = '';
      var path = "#libraryAdmin";
      window.location.href=path;
  };//end addStory


}]);
