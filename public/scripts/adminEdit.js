myApp.controller('adminEditController',
['$scope', '$http', '$uibModal', '$rootScope', '$location', '$sce', 'userData',
function($scope, $http, $uibModal, $rootScope, $location, $sce, userData){

// both of the following function calls set button views and permissions upon login
userData.checkAuth();
userData.setBtnsView();

$scope.tempTextArray = []; // array that holds all words as checked boxes.
$scope.checkedArray = []; // array that only holds words that have been checked.
$scope.newTextArray = []; // array that holds new text after check boxes have been removed and buttons applied.
$scope.showAddStoryDiv = false;
$scope.showCoverInfoBefore = true;
$scope.showCoverInfoAfter = false;
$scope.displayBefore = true;
$scope.displayAfter = false;
$scope.cleanText = '';

// loads all characters for a given story to be changed in the "chooseName" function
$scope.selectReaderStory = function(index) {
  $rootScope.characters = [];
  $rootScope.readerIndex = $rootScope.stories[index];
  for (var i = 0; i < $rootScope.readerIndex.story_characters.length; i++) {
    $rootScope.characters.push($rootScope.readerIndex.story_characters[i].character_name);
  } // end for loop
  var path = "#userLibrary";
  window.location.href = path;
}; // end selectReaderStory

// opens the add new story view and sets whether or not a story
// is new or old(edit) for how arrays are to be used
$scope.openAdminEdit = function() {
  $rootScope.isNewOrEdit = 0;
  var path = "#adminAddNewStory";
  $rootScope.tempNewStoryArray = [];
  window.location.href = path;
}; // end openTextPopup

// redirects to adminEdit then loads a given story to be edited and determines
// whether or not a story is new or old(edit) for how arrays are to be used
$scope.editStory = function(index) {
  $rootScope.isNewOrEdit = 1;
  var path = "#adminEdit";
  $rootScope.tempIndex = $rootScope.stories[index]._id;
  $rootScope.storyIndex = $rootScope.stories[index];
  $rootScope.storyArrayIndex = index;
  window.location.href = path;
}; // end editStory

// creates a new story
$scope.addStory = function() {
  $rootScope.tempStoryName = $scope.storyTitleBinder;
  var storyToAdd = {
    story_title: $scope.storyTitleBinder,
    story_cover: $scope.storyCoverBinder,
    story_description: $scope.storyDescrpitionBinder
  }; // end objectToSend
  $http({
    method: 'POST',
    url: '/addStory',
    data: storyToAdd
  }).then(function(response){
    $rootScope.tempIndex = response.data._id;
    $rootScope.tempNewStoryArray = response.data;
    userData.getAllStories();
  }); // end $http
  $scope.storyTitleBinder = '';
  $scope.storyCoverBinder = '';
  $scope.storyDescrpitionBinder = '';
  $scope.showAddStoryDiv = true;
  $scope.showCoverInfoBefore = false;
  $scope.showCoverInfoAfter = true;
}; // end addStory

// opens addNewCharPopup
$scope.addNewChar = function() {
  $uibModal.open({
    templateUrl: 'views/pages/addNewCharPopup.html',
    controller: 'adminEditPopupController'
  }); // end $modal.open
}; // end addNewChar

// adds a new character then either pushes it to new array or existing depending on permissions
$scope.addChar = function() {
  var characterObject = {
    character_name: $scope.characterNameBinder,
    character_traits: [$scope.characterTraitBinderOne, $scope.characterTraitBinderTwo, $scope.characterTraitBinderThree],
    character_bio: $scope.characterBioBinder,
    character_photo: $scope.characterPhotoBinder,
    id: $rootScope.tempIndex
  }; // end characterObject
  if ($scope.isNewOrEdit === 0) {
    $rootScope.tempNewStoryArray.story_characters.push(characterObject);
  } else {
    $rootScope.storyIndex.story_characters.push(characterObject);
  } // end else
  $http({
    method: 'POST',
    url: '/addCharacter',
    data: characterObject
  }).then(function(response){
    userData.getAllStories();
  }); // end $http
  $scope.characterNameBinder = '';
  $scope.characterTraitBinderOne = '';
  $scope.characterTraitBinderTwo = '';
  $scope.characterTraitBinderThree = '';
  $scope.characterBioBinder = '';
  $scope.characterPhotoBinder = '';
}; // end addChar

// opens addNewPage pop
$scope.addNewPage = function() {
  $uibModal.open({
    templateUrl: 'views/pages/addNewPagePopup.html',
    controller: 'adminEditPopupController',
    size: 'lg'
  }); // end $modal.open
}; // end addNewChar

// this is 1 of 3 important madlibs functions. First, this function captures the admin input of a story
// then saves a clean copy of it while setting a temporary one to be worked on. Then it breaks input down
// the input into individual words with a checkbox on each word.
$scope.captureStoryInput = function() {
  if ($scope.pageTextBinder === '' || $scope.pageTextBinder === undefined || $scope.pageTextBinder === null){
    window.alert('Text field can not be left empty.\nPlease enter a story.');
  } else
  if ($scope.pageNumberBinder === '' || $scope.pageNumberBinder === undefined || $scope.pageNumberBinder === null){
    window.alert('Page number can not be left empty.\nPlease enter a page number.');
  } else {
    $scope.cleanText = $scope.pageTextBinder; // stores copy of original clean text
    $scope.tempTextArray = $scope.pageTextBinder;
    $scope.tempTextArray = $scope.tempTextArray.replace(/\n/g, ''); // removes page breaks
    $scope.stringLength = $scope.tempTextArray.split(/[^\s]+/).length - 1; // counts total words based on spaces
    $scope.tempTextArray = $scope.tempTextArray.split(' '); // splits remaining words into an array
    for (var i = 0; i < $scope.stringLength; i++) { // for loop 1
      var taggedWord = '<input type="checkbox" onclick="setWordTrue('+ i +')" id="wordNum'+ i +'">' + $scope.tempTextArray[i] + ' ';
      $scope.tempTextArray.splice(i, 1, taggedWord);
    } // end for loop 1
  } // end else
  var textDiv = angular.element(document.querySelector('#adminStory'));
  textDiv.empty();
  var textArrayDisplay = $scope.tempTextArray.join('');
  textDiv.append(textArrayDisplay);
  $scope.displayBefore = false;
  $scope.displayAfter = true;
}; // end captureStoryInput

// 2 of 3 of madlibs: Another important feature of the madlibs funcitonality. First, due to angularJs contraints, this function
// must be in naked javascript as the button that calls this function is in string form being passed from the "captureStoryInput."
// Second, the setWordTrue function then records whether or not a word hs been checked and saves that info on the checkedArray.
// to be used later in 3 of 3.
setWordTrue = function(num) {
  $scope.checkedWord = $scope.tempTextArray[num];
  if(document.getElementById('wordNum' + num).checked) {
    $scope.checkedArray.push($scope.checkedWord);
  } else if (!document.getElementById('wordNum' + num).checked) {
    for (var i = 0; i < $scope.checkedArray.length; i++) { // for loop 1
      if($scope.checkedWord === $scope.checkedArray[i]) {
        $scope.checkedArray.splice(i, 1);
      } // end if
    } // end for loop 1
  } // end else/if
}; // end setWordTrue

// 3 of 3 of the madlibs: The last major function for the madlibs. In "saveStory," an array of checked boxes is gone through if found
// true, is replaced with a button that will then be clickable. If found false, the button is stripped back down to a normal
// word and new array of clickable and normal words is saved to either new or existing story.
$scope.saveStory = function() {
  var arrayLength = $scope.tempTextArray.length;
  for (var i = 0; i < arrayLength; i++) { // for loop 1
    var num = i;
    for (var x = 0; x < $scope.checkedArray.length; x++) { // for loop 2
      if ($scope.tempTextArray[num] === $scope.checkedArray[x]) {
        var wordLeftover = $scope.tempTextArray[i].replace('<input type="checkbox" onclick="setWordTrue('+ num +')" id="wordNum'+ num +'">', '').trim();
        var taggedWord = '<button class="wordBtn" id="wordMadlib'+ num +'" onclick="openTextPopup('+ num +')">' + wordLeftover + '</button> ';
        $scope.tempTextArray.splice(i, 1, taggedWord);
      } // end if
    } // for loop 2
    var parsedWord = $scope.tempTextArray[num].replace('<input type="checkbox" onclick="setWordTrue('+ num +')" id="wordNum'+ num +'">', '').trim();
    $scope.newTextArray.push(parsedWord);
  } // end for loop 1
  var story_pages = {
    page_number: Number($scope.pageNumberBinder),
    page_text_plain: $scope.cleanText,
    page_text_btn: $scope.newTextArray,
    page_illustration: $scope.pageIllustrationBinder,
    id: $rootScope.tempIndex
  }; // end pageObject
  if ($scope.isNewOrEdit === 0) {
    $rootScope.tempNewStoryArray.story_pages.push(story_pages);
  } else {
    $rootScope.storyIndex.story_pages.push(story_pages);
  } // end else
  $http({
    method: 'POST',
    url: '/addPage',
    data: story_pages
  }).then(function(response) {
    userData.getAllStories();
  }); // end $http
  if ($scope.isNewOrEdit === 1) {
    $rootScope.cancel();
  } // end if
  $scope.textReset();
}; // end saveStory

// resets admin fields.
$scope.textReset = function() {
  var textDiv = angular.element(document.querySelector('#adminStory'));
  textDiv.empty();
  $scope.tempTextArray = [];
  $scope.checkedArray = [];
  $scope.newTextArray = [];
  $scope.stringLength = '';
  $scope.cleanText = '';
  $scope.nameChangeBinder = '';
  $scope.pageNumberBinder ='';
  $scope.pageTextBinder ='';
  $scope.pageIllustrationBinder = '';
  $scope.displayBefore = true;
  $scope.displayAfter = false;
}; // end textReset

// confirms and deletes a story
$scope.deleteStory = function(index) {
  var confirmDeleteStory = confirm('Please confirm to delete ' + $rootScope.stories[index].story_title + ' story');
  if (confirmDeleteStory) {
    var storyIdNum = {
      id: $rootScope.stories[index]._id
    }; // end playerId
    $http({
      method: 'POST',
      url: '/storyRemove',
      data: storyIdNum
    }); // end $http
    $rootScope.stories.splice(index, 1);
  } else {
    console.log('delete aborted');
  } // end else
}; // end deleteStory

// determines if new or existing, confirms delete then removes a character from DB
$scope.deleteChar = function(index) {
  if ($scope.isNewOrEdit === 0) {
    $scope.charArray = $rootScope.tempNewStoryArray;
  } else {
    $scope.charArray = $rootScope.storyIndex;
  } // end else
  var confirmDeleteChar = confirm('Please confirm to delete ' + $scope.charArray.story_characters[index].character_name + ' story');
  if (confirmDeleteChar) {
    if ($scope.isNewOrEdit === 0) {
      $scope.storyArray = $rootScope.tempNewStoryArray;
    } else {
      $scope.storyArray = $rootScope.storyIndex;
    } // end else
    for (var i = 0; i < $scope.storyArray.story_characters.length; i++) {
      if ($scope.storyArray.story_characters[index] === $scope.storyArray.story_characters[i]) {
        $scope.storyArray.story_characters.splice(i, 1);
      } // end if
    } // end for loop
    var newStory_characters = {
      story_characters: $scope.storyArray.story_characters,
      id: $rootScope.tempIndex
    }; // end newStory_characters
    $http({
      method: 'POST',
      url: '/updateCharacter',
      data: newStory_characters
    }).then(function(response){
    userData.getAllStories();
    }); // end then
  } else {
    console.log('delete aborted');
  } // end else
}; // end charDelete

// determines if new or existing, confirms delete then removes a page from DB
$scope.deletePage = function(index) {
  if ($scope.isNewOrEdit === 0) {
    $scope.pageArray = $rootScope.tempNewStoryArray;
  } else {
    $scope.pageArray = $rootScope.storyIndex;
  } // end else
  var confirmDeletePage = confirm('Please confirm to delete page #' + $scope.pageArray.story_pages[index].page_number);
  if (confirmDeletePage) {
    if ($scope.isNewOrEdit === 0) {
      $scope.storyArray = $rootScope.tempNewStoryArray;
    } else {
      $scope.storyArray = $rootScope.storyIndex;
    } // end else
    for (var i = 0; i < $scope.storyArray.story_pages.length; i++) {
      if ($scope.storyArray.story_pages[index] === $scope.storyArray.story_pages[i]) {
        $scope.storyArray.story_pages.splice(i, 1);
      } // end if
    } // end for loop
    var newStory_pages = {
      story_pages: $scope.storyArray.story_pages,
      id: $rootScope.tempIndex
    }; // end newStory_characters
    $http({
      method: 'POST',
      url: '/updatePage',
      data: newStory_pages
    }).then(function(response){
    userData.getAllStories();
    }); // end then
  } else {
    console.log('delete aborted');
  } // end else
}; // end deletePage

$scope.editStoryCover = function(index) {
  $rootScope.tempPageId = index;
  $uibModal.open({
    templateUrl: 'views/pages/editCoverPopup.html',
    controller: 'adminCoverPopupController',
    size:'lg',
    resolve: {
      index: function(){
      return index;
      } // end index
    } // end resolve
  }); // end $modal.open
}; // end editStoryCover

$scope.editCharacter = function(index) {
  $rootScope.tempPageId = index;
  $uibModal.open({
    templateUrl: 'views/pages/editCharactersPopup.html',
    controller: 'adminCharacterPopupController',
    size:'lg',
    resolve: {
      index: function(){
      return index;
      } // end index
    } // end resolve
  }); // end $modal.open
}; // end editCharacter

$scope.editPage = function(index) {
  $rootScope.tempPageId = index;
  $uibModal.open({
    templateUrl: 'views/pages/editPagePopup.html',
    controller: 'adminPagePopupController',
    size: 'lg',
    resolve: {
      index: function(){
      return index;
      } // end index
    } // end resolve
  }); // end $modal.open
}; // end editPage

// After ID is passed from the editCoverPopup, allows for editing of story cover
$scope.editCover = function() {
  var newCoverObject = {
    story_title: $scope.tempTitle,
    story_description: $scope.tempDescription,
    story_cover: $scope.tempCover,
    id: $rootScope.tempIndex
  }; // end updateCharacter
  for (var i = 0; i < $scope.changeCoverInfo.length; i++) {
    if ($rootScope.tempIndex === $scope.changeCoverInfo[i]._id) {
      if ($scope.isNewOrEdit === 0) {
        $rootScope.tempNewStoryArray.story_title = $scope.tempTitle;
        $rootScope.tempNewStoryArray.story_description = $scope.tempDescription;
        $rootScope.tempNewStoryArray.story_cover = $scope.tempCover;
      } else {
        $rootScope.storyIndex.story_title = newCoverObject.story_title;
        $rootScope.storyIndex.story_description = newCoverObject.story_description;
        $rootScope.storyIndex.story_cover = $newCoverObject.story_cover;
      } // end else
    } // end if
  } // end for loop
  $http({
    method: 'POST',
    url: '/updateCover',
    data: newCoverObject
  }).then(function(response){
  userData.getAllStories();
}); // end then
  $rootScope.cancel();
}; // end editCover

// After ID is passed from the editCharactersPopup, allows for editing of characters from a given story
$scope.updateCharacter = function(){
  var newCharObject = {
    character_name: $scope.charName,
    character_traits: [$scope.traitOne, $scope.traitTwo, $scope.traitThree],
    character_bio: $scope.charBio,
    character_photo: $scope.charPhoto,
  }; // end updateCharacter
  for (var i = 0; i < $scope.storyArray.story_characters.length; i++) {
    if ($scope.storyArray.story_characters[$rootScope.tempPageId] === $scope.storyArray.story_characters[i]) {
      $scope.storyArray.story_characters.splice(i, 1, newCharObject);
    } // end if
  } // end for loop
  var newStory_characters = {
    story_characters: $scope.storyArray.story_characters,
    id: $rootScope.tempIndex
  }; // end newStory_characters
  $http({
    method: 'POST',
    url: '/updateCharacter',
    data: newStory_characters
  }).then(function(response){
  userData.getAllStories();
}); // end then
  $rootScope.cancel();
}; // end updateCharacter

// After ID is passed from the editPagePopup, allows for editing of pages from a given story
$scope.updatePage = function() {
  var arrayLength = $scope.tempTextArray.length;
  for (var i = 0; i < arrayLength; i++) { // for loop 1
    var num = i;
    for (var x = 0; x < $scope.checkedArray.length; x++) { // for loop 2
      if ($scope.tempTextArray[num] === $scope.checkedArray[x]) {
        var wordLeftover = $scope.tempTextArray[i].replace('<input type="checkbox" onclick="setWordTrue('+ num +')" id="wordNum'+ num +'">', '').trim();
        var taggedWord = '<button class="wordBtn" id="wordMadlib'+ num +'" onclick="openTextPopup('+ num +')">' + wordLeftover + '</button> ';
        $scope.tempTextArray.splice(i, 1, taggedWord);
      } // end if
    } // for loop 2
    var parsedWord = $scope.tempTextArray[num].replace('<input type="checkbox" onclick="setWordTrue('+ num +')" id="wordNum'+ num +'">', '').trim();
    $scope.newTextArray.push(parsedWord);
  } // end for loop 1
  var storyPages = {
    page_number: $scope.pageNumberBinder,
    page_text_plain: $scope.cleanText,
    page_text_btn: $scope.newTextArray,
    page_illustration: $scope.pageIllustrationBinder,
    id: $rootScope.tempIndex
  }; // end pageObject
  for (var y = 0; y < $scope.pageArray.story_pages.length; y++) {
    if ($scope.pageArray.story_pages[$rootScope.tempPageId] === $scope.pageArray.story_pages[y]) {
      $scope.pageArray.story_pages.splice(y, 1, storyPages);
    } // end if
  } // end for loop
  var newStory_pages = {
    story_pages: $scope.pageArray.story_pages,
    id: $rootScope.tempIndex
  }; // end newStory_characters
  console.log($scope.pageArray.story_pages);
  $http({
    method: 'POST',
    url: '/updatePage',
    data: newStory_pages
  }).then(function(response) {
    userData.getAllStories();
  }); // end $http
  $rootScope.cancel();
  $scope.textReset();
}; // end updatePage


}]); // end adminEditController

//-----------------------------------------  adminEditPopupController -----------------------------------------

angular.module('myApp').controller('adminEditPopupController',
function ($scope, $uibModalInstance, $rootScope, userData) {

  $rootScope.cancel = function() {
    $uibModalInstance.close();
  }; // end cancel
}); // end logoutModalController

//-----------------------------------------  adminEditPopupController -----------------------------------------

angular.module('myApp').controller('adminCoverPopupController',
function ($scope, $uibModalInstance, $rootScope, userData, index) {

  var arrayNum = $rootScope.storyArrayIndex;

  // info passed from popups is then used below to determine if a story is new or existing for
  // purposes of editing arrays
  if ($scope.isNewOrEdit === 0) {
    $scope.tempTitle = $rootScope.tempNewStoryArray.story_title;
    $scope.tempDescription = $rootScope.tempNewStoryArray.story_description;
    $scope.tempCover = $rootScope.tempNewStoryArray.story_cover;
    $scope.changeCoverInfo = $rootScope.tempNewStoryArray;
  } else {
    $scope.tempTitle = $rootScope.storyIndex.story_title;
    $scope.tempDescription = $rootScope.storyIndex.story_description;
    $scope.tempCover = $rootScope.storyIndex.story_cover;
    $scope.changeCoverInfo = $rootScope.storyIndex;
  } // end else

  $rootScope.cancel = function() {
    $uibModalInstance.close();
  }; // end cancel
}); // end logoutModalController

//-----------------------------------------  adminCharacterPopupController -----------------------------------------

angular.module('myApp').controller('adminCharacterPopupController',
function ($scope, $uibModalInstance, $rootScope, $http, userData, index) {

  // info passed from popups is then used below to determine if a story is new or existing for
  // purposes of editing arrays
  if ($scope.isNewOrEdit === 0) {
    $scope.tempStoryInfo = $rootScope.tempNewStoryArray.story_characters[index];  // new
    $scope.storyArray = $rootScope.tempNewStoryArray;
  } else {
    $scope.tempStoryInfo = $rootScope.storyIndex.story_characters[index];  // edit
    $scope.storyArray = $rootScope.storyIndex;
  } // end else

  $scope.charName = $scope.tempStoryInfo.character_name;
  $scope.traitOne = $scope.tempStoryInfo.character_traits[0];
  $scope.traitTwo = $scope.tempStoryInfo.character_traits[1];
  $scope.traitThree = $scope.tempStoryInfo.character_traits[2];
  $scope.charBio = $scope.tempStoryInfo.character_bio;
  $scope.charPhoto = $scope.tempStoryInfo.character_photo;

  $rootScope.cancel = function() {
    $uibModalInstance.close();
  }; // end cancel

}); // end logoutModalController

//-----------------------------------------  adminPagePopupController -----------------------------------------

angular.module('myApp').controller('adminPagePopupController',
function ($scope, $uibModalInstance, $rootScope, userData, index) {

  // info passed from popups is then used below to determine if a story is new or existing for
  // purposes of editing arrays
  if ($scope.isNewOrEdit === 0) {
    $scope.tempStoryInfo = $rootScope.tempNewStoryArray.story_pages[index]; // new
    $scope.pageArray = $rootScope.tempNewStoryArray;
  } else {
    $scope.tempStoryInfo = $rootScope.storyIndex.story_pages[index]; // edit
    $scope.pageArray = $rootScope.storyIndex;
  } // end else

  $scope.pageTextBinder = $scope.tempStoryInfo.page_text_plain;
  $scope.pageNumberBinder = $scope.tempStoryInfo.page_number;
  $scope.pageIllustrationBinder = $scope.tempStoryInfo.page_illustration;

  $rootScope.cancel = function() {
    $uibModalInstance.close();
  }; // end cancel
}); // end logoutModalController
