angular.module('myApp').controller('userStoryController',
['$scope', '$http', '$rootScope', '$location', 'userData', '$mdSidenav', '$uibModal',
function ($scope, $http, $rootScope, $location, userData, $mdSidenav, $uibModal) {

// userData.checkAuth();

userData.getAllStories();

$rootScope.stories = [];
$scope.myStory = [];
$scope.newName = '';

$scope.myStoryLoad = function() {
  $scope.currentStory = $rootScope.readerIndex.story_pages;
  $scope.myStory = $scope.currentStory[$rootScope.pageIndex];
  var parsedText = angular.element(document.querySelector('#userStory'));
  parsedText.empty();
  parsedText.append($scope.currentStory[$rootScope.pageIndex].page_text_btn.join(' '));
  window.scrollTo(0,0);
}; // end myStoryLoad

$scope.chooseNamePopup = function() {
  $scope.myStoryLoad();
  $uibModal.open({
    templateUrl: 'views/pages/chooseName.html',
    controller: 'textPopupController'
  }); // end $modal.open
}; // end openTextPopup

$scope.selectReaderStory = function(index) {
  $rootScope.characters = [];
  $rootScope.readerIndex = $rootScope.stories[index];
  for (var i = 0; i < $rootScope.readerIndex.story_characters.length; i++) {
    $rootScope.characters.push($rootScope.readerIndex.story_characters[i].character_name);
  }
  var path = "#userLibrary";
  window.location.href = path;
}; // end selectReaderStory

$scope.nameReplace = function(newName, oldName) {
  for (var i = 0; i < $rootScope.readerIndex.story_pages.length; i++) { // for loop 1
    $rootScope.readerIndex.story_pages[i].page_text_btn = $rootScope.readerIndex.story_pages[i].page_text_btn.join(' ');
    var regExp = new RegExp(oldName, 'gi');
    $rootScope.readerIndex.story_pages[i].page_text_btn = $rootScope.readerIndex.story_pages[i].page_text_btn.replace(regExp, newName).trim();
    $rootScope.readerIndex.story_pages[i].page_text_btn = $rootScope.readerIndex.story_pages[i].page_text_btn.split(' ');
  } // end for loop 1
  $scope.myStoryLoad();
}; // end nameReplace

$scope.nextPage = function(){
  $rootScope.pageIndex++;
  if ($rootScope.pageIndex == $scope.currentStory.length ) {
    $rootScope.pageIndex = 0;
  } // end if
  var text = angular.element(document.querySelector('#userStory'));
  text.empty();
  text.append($scope.currentStory[$rootScope.pageIndex].page_text_btn.join(' '));
  $scope.myStoryLoad();
  event.preventDefault();
}; // end nextPage

$scope.prevPage = function() {
  $rootScope.pageIndex--;
  if ($rootScope.pageIndex === - 1) {
    $rootScope.pageIndexx = $scope.currentStory.length - 1;
  } // end if
  var text = angular.element(document.querySelector('#userStory'));
  text.empty();
  text.append($scope.currentStory[$rootScope.pageIndex].page_text_btn.join(' '));
  $scope.myStoryLoad();
  event.preventDefault();
}; // end prevPage

openTextPopup = function(num) {
  $rootScope.tempIdNum = num;
  var uncleanWord = document.getElementById('wordMadlib' + num).innerHTML;
  var cleanWord = uncleanWord.replace(/[^a-zA-Z]/g, '');
  $rootScope.wordByElementId = cleanWord;
  $uibModal.open({
    templateUrl: 'views/pages/textPopup.html',
    controller: 'textPopupController',
    size: 'sm'
  }); // end $modal.open
}; // end openTextPopup

$scope.submitChange = function() {
  var num = $rootScope.tempIdNum;
  var pageArray = $rootScope.readerIndex.story_pages[$rootScope.pageIndex].page_text_btn;
  var newTaggedWord = '<button class="wordBtn" id="wordMadlib'+ num +'" onclick="openTextPopup('+ num +')">' + $scope.newWord + '</button> ';
  pageArray.splice((num), 1, newTaggedWord);
  var text = angular.element(document.querySelector('#userStory'));
  text.empty();
  text.append(pageArray.join(' '));
  $rootScope.cancel();
}; // end submitChange

$scope.arialFont = function(){
  $scope.storyClass = "arialClass";
};
$scope.comicFont = function(){
  $scope.storyClass = "comicClass";
};
$scope.openDyslexicFont = function(){
  $scope.storyClass = "openDyslexicClass";
};
$scope.smallFont = function(){
  $scope.sizeClass = "smallClass";
};
$scope.mediumFont = function(){
  $scope.sizeClass = "mediumClass";
};
$scope.largeFont = function(){
  $scope.sizeClass = "largeClass";
};

}]); // end userStoryController

//-----------------------------------------  textPopupController -----------------------------------------

angular.module('myApp').controller('textPopupController',
function ($scope, $uibModalInstance, $rootScope) {

  $rootScope.cancel = function(){
    $uibModalInstance.close();
  }; // end cancel
}); // end logoutModalController
