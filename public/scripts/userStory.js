angular.module('myApp').controller('userStoryController',
['$scope', '$http', '$rootScope', '$location', 'userData', '$mdSidenav', '$uibModal',
function ($scope, $http, $rootScope, $location, userData, $mdSidenav, $uibModal) {

userData.checkAuth();

$scope.toggle =function(){
  console.log("toggle clicked");
  $scope.commentText = !$scope.commentText;
};
userData.getAllStories();

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

// $scope.selectReaderStory = function(index) {
//   $rootScope.characters = [];
//   $rootScope.readerIndex = $rootScope.stories[index];
//   for (var i = 0; i < $rootScope.readerIndex.story_characters.length; i++) {
//     $rootScope.characters.push($rootScope.readerIndex.story_characters[i].character_name);
//   } // end for loop
//   var path = "#userLibrary";
//   window.location.href = path;
// }; // end selectReaderStory

$scope.nameReplace = function(newName, oldName) {
// $scope.activeItem=item;
  // $scope.alertText = !$scope.alertText;
  // document.getElementById("changeBtn").
  // addEventListener("click", function(){
  //   this.style.backgroundColor = "red";
    // angular.element($event.target).scope().style.backgroundColor = "red";

// });
  var regExp = new RegExp(oldName, 'gi');
  for (var i = 0; i < $rootScope.readerIndex.story_pages.length; i++) { // for loop 1
    for (var x = 0; x < $rootScope.readerIndex.story_pages[i].page_text_btn.length; x++) { // for loop 2
      $rootScope.readerIndex.story_pages[i].page_text_btn[x] = $rootScope.readerIndex.story_pages[i].page_text_btn[x].replace(regExp, newName);
    } // end for loop 2
  } // end for loop 1
  $scope.myStoryLoad();
}; // end nameReplace

$scope.nextPage = function() {
  $rootScope.pageIndex++;
  if ($rootScope.pageIndex === $scope.currentStory.length ) {
    $rootScope.pageIndex = 0;
  } // end if
  var page = angular.element(document.querySelector('#userStory'));
  page.empty();
  page.append($scope.currentStory[$rootScope.pageIndex].page_text_btn.join(' '));
  $scope.myStoryLoad();
  event.preventDefault();
}; // end nextPage

$scope.prevPage = function() {
  $rootScope.pageIndex--;
  if ($rootScope.pageIndex === - 1) {
    $rootScope.pageIndex = $scope.currentStory.length - 1;
  } // end if
  var page = angular.element(document.querySelector('#userStory'));
  page.empty();
  page.append($scope.currentStory[$rootScope.pageIndex].page_text_btn.join(' '));
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
  var newTaggedWord = '<button class="wordBtn pulse" id="wordMadlib'+ num +'" onclick="openTextPopup('+ num +')">' + $scope.newWord + '</button> ';
  pageArray.splice((num), 1, newTaggedWord);
  var text = angular.element(document.querySelector('#userStory'));
  text.empty();
  text.append(pageArray.join(' '));
  $rootScope.cancel();
}; // end submitChange

$scope.arialFont = function() {
  $scope.storyClass = "arialClass";
};
$scope.comicFont = function() {
  $scope.storyClass = "comicClass";
};
$scope.openDyslexicFont = function() {
  $scope.storyClass = "openDyslexicClass";
};
$scope.smallFont = function() {
  $scope.sizeClass = "smallClass";
};
$scope.mediumFont = function() {
  $scope.sizeClass = "mediumClass";
};
$scope.largeFont = function() {
  $scope.sizeClass = "largeClass";
};

}]); // end userStoryController

//-----------------------------------------  textPopupController -----------------------------------------

angular.module('myApp').controller('textPopupController',
function ($scope, $uibModalInstance, $rootScope) {

  $rootScope.cancel = function() {
    $uibModalInstance.close();
  }; // end cancel
}); // end logoutModalController
