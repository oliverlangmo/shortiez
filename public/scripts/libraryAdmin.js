angular.module('myApp').controller('libraryCtrl',
['$scope', '$http', '$rootScope', '$location', 'userData',
function ($scope, $http, $rootScope, $location, userData) {

// uncomment this if you want only authorized users access this page
// userData.checkAuth();

userData.getAllStories();

$scope.addStory = function(){ // adds issue on button click
  var storyToCreate = {  // package object to send, with inputs
    story_title: $scope.storyTitleBinder,
    story_cover: $scope.storyCoverBinder,
    story_description: $scope.storyDescrpitionBinder
  }; //end objectToSend
  console.log(storyToCreate, "storyToCreate");
  $http({
    method: 'POST',
    url: '/addStory',
    data: storyToCreate
  }); //end $http
    $scope.storyTitleBinder ='';
    $scope.storyCoverBinder ='';
    $scope.storyDescrpitionBinder = '';
    $location.path('/#/libraryAdmin');

}; //end addStory

$scope.toggle = function() {
        $scope.addStoryToggle = !$scope.addStoryToggle;
    };

$rootScope.stories = [];

event.preventDefault();


$scope.editStory= function(index){
  var path= "#adminPagesCharInput";
  $rootScope.tempIndex = $rootScope.stories[index]._id;
  $rootScope.storyIndex = $rootScope.stories[index];
  console.log("Stories: " + $rootScope.stories[index]._id);
  window.location.href = path;
};

$scope.selectReaderStory = function(index) {
  console.log('index', index);
  $rootScope.readerIndex = $rootScope.stories[index];
  var path = "#readerLandingPage";
  window.location.href = path;
};

}]);//end of libraryCtrl controller
