// angular.module('myApp').controller('libraryAdminController',
// ['$scope', '$http', '$uibModal', '$rootScope', '$location', '$sce', 'userData',
// function($scope, $http, $uibModal, $rootScope, $location, $sce, userData){
//
// // userData.adminCheck();
//
// userData.getAllStories();
// event.preventDefault();
// 
// $rootScope.stories = [];
//
// $scope.openAdminEdit = function() {
//   var path = "#adminAddNewStory";
//   window.location.href = path;
// }; // end openTextPopup
//
// $scope.editStory = function(index) {
//   var path = "#adminEdit";
//   $rootScope.tempIndex = $rootScope.stories[index]._id;
//   $rootScope.storyIndex = $rootScope.stories[index];
//   $rootScope.storyArrayIndex = index;
//   window.location.href = path;
// }; // end editStory
//
// }]); // end of libraryCtrl controller
//
// //-----------------------------------------  adminAddStoryPopupController -----------------------------------------
//
// angular.module('myApp').controller('adminAddStoryPopupController',
// function ($scope, $uibModalInstance, $rootScope) {
//
//   $rootScope.cancel = function() {
//     $uibModalInstance.close();
//   }; // end cancel
// }); // end logoutModalController
