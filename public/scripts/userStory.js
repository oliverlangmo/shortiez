angular.module('myApp').controller('userStoryController',
['$scope', '$http', '$rootScope', '$location', 'userData', '$mdSidenav', '$uibModal',
function ($scope, $http, $rootScope, $location, userData, $mdSidenav, $uibModal) {

userData.checkAuth();
userData.getBadWords();
userData.getAllStories();

$scope.toggle = function() {
  $scope.commentText = !$scope.commentText;
}; // end toggle

$scope.myStory = [];
$scope.newName = '';
$scope.showTrue = []; // shows/hides on chooseNamePopup
$scope.newNames = []; // new names for textPopup

$scope.setNewNames = function() {
  for (var a = 0; a < $rootScope.readerIndex.story_characters.length; a++) {
    var nameHolder = '';
    var charName = new CharName(nameHolder, a);
    $scope.newNames.push(charName);
  } // end for loop
}; // end setNewNames

$scope.setNewNames();

$scope.myStoryLoad = function() {
  $scope.currentStory = $rootScope.readerIndex.story_pages;
  $scope.currentStory.sort(function(a, b){return a.page_number - b.page_number;});
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
    controller: 'textPopupController',
    size: 'lg'
  }); // end $modal.open
}; // end openTextPopup

function CharName(newCharName, arrayNum) {
  this.newCharName = newCharName;
  this.arrayNum = arrayNum;
} // end charName

$scope.nameReplace = function(newName, oldName, index) {
  console.log($scope.readerIndex.story_characters[index].character_photo);
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
  $scope.readerIndex.story_characters[index].character_name = newName;
  $scope.newNames.splice(index, 1, newName);
  $scope.showTrue[index] = true;
  $scope.myStoryLoad();
}; // end nameReplace

$scope.editName = function(index) {
  $scope.showTrue[index] = false;
}; // end editName

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
  var badWordCheck = false;
  for (var i = 0; i < $rootScope.badWordsArray[0].badWords.length; i++) {
    if ($scope.newWord === $rootScope.badWordsArray[0].badWords[i]) {
      window.alert("Oops, you entered a naughty word." +
        "\nPlease enter a nice, new word.");
      num = $rootScope.tempIdNum;
      pageArray = $rootScope.readerIndex.story_pages[$rootScope.pageIndex].page_text_btn;
      newTaggedWord = '<button class="wordBtn pulse" id="wordMadlib'+ num +'" onclick="openTextPopup('+ num +')">' + 'BLEEP!' + '</button> ';
      pageArray.splice((num), 1, newTaggedWord);
      text = angular.element(document.querySelector('#userStory'));
      text.empty();
      text.append(pageArray.join(' '));
      badWordCheck = true;
      $rootScope.cancel();
    } // end if
  } // end for loop
  if (badWordCheck === false) {
    num = $rootScope.tempIdNum;
    pageArray = $rootScope.readerIndex.story_pages[$rootScope.pageIndex].page_text_btn;
    newTaggedWord = '<button class="wordBtn pulse" id="wordMadlib'+ num +'" onclick="openTextPopup('+ num +')">' + $scope.newWord + '</button> ';
    pageArray.splice((num), 1, newTaggedWord);
    text = angular.element(document.querySelector('#userStory'));
    text.empty();
    text.append(pageArray.join(' '));
    $rootScope.cancel();
    badWordCheck = false;
  } // end if
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
