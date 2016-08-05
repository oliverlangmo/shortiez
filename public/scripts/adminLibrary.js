angular.module('myApp').controller('libraryAdminController',
['$scope', '$http', '$uibModal', '$rootScope', '$location', '$sce', 'userData',
function($scope, $http, $uibModal, $rootScope, $location, $sce, userData){

userData.adminCheck();

userData.getAllStories();
event.preventDefault();

$rootScope.stories = [];

$scope.addNewStoryPopup = function() {
  $uibModal.open({
    templateUrl: 'views/pages/adminAddNewStory.html',
    controller: 'adminAddStoryPopupController'
  }); // end $modal.open
}; // end openTextPopup

$scope.addStory = function() {
  var storyToCreate = {
    story_title: $scope.storyTitleBinder,
    story_cover: $scope.storyCoverBinder,
    story_description: $scope.storyDescrpitionBinder
  }; // end objectToSend
  console.log(storyToCreate, "storyToCreate");
  $http({
    method: 'POST',
    url: '/addStory',
    data: storyToCreate
  }); //end $http
  var path = "#adminEdit";
  $scope.storyTitleBinder ='';
  $scope.storyCoverBinder ='';
  $scope.storyDescrpitionBinder = '';
  window.location.href = path;
  $rootScope.cancel();
}; // end addStory

$scope.toggle = function() {
  $scope.addStoryToggle = !$scope.addStoryToggle;
}; // end toggle

$scope.editStory = function(index) {
  var path = "#adminEdit";
  $rootScope.tempIndex = $rootScope.stories[index]._id;
  $rootScope.storyIndex = $rootScope.stories[index];
  $rootScope.storyArrayIndex = index;
  window.location.href = path;
}; // end editStory

}]); // end of libraryCtrl controller

//-----------------------------------------  adminAddStoryPopupController -----------------------------------------

angular.module('myApp').controller('adminAddStoryPopupController',
function ($scope, $uibModalInstance, $rootScope) {

  $rootScope.cancel = function() {
    $uibModalInstance.close();
  }; // end cancel
}); // end logoutModalController
