myApp.controller('adminEditController',
['$scope', '$http', '$uibModal', '$rootScope', '$location', '$sce', 'userData',
function($scope, $http, $uibModal, $rootScope, $location, $sce, userData){

userData.adminCheck();

userData.getAllStories();


$scope.myStory = [];
$scope.characters = [];
$scope.pages = [];
$scope.tempTextArray = []; // array that holds all words as checked boxes.
$scope.checkedArray = []; // array that only holds words that have been checked.
$scope.newTextArray = []; // array that holds new text after check boxes have been removed and buttons applied.

$scope.adminStoryLoad = function() {
  console.log($rootScope.tempIndex);
  console.log($rootScope.stories[$rootScope.storyArrayIndex]);
  // $scope.currentStory = $rootScope.storyIndex.story_pages;
  $scope.characters = $rootScope.storyIndex.story_characters;
  $scope.pages = $rootScope.storyIndex.story_pages;
}; // end adminStoryLoad()

$scope.addChar = function() {
  var characterObject = {
    character_name: $scope.characterNameBinder,
    character_traits: [$scope.characterTraitBinderOne, $scope.characterTraitBinderTwo, $scope.characterTraitBinderThree],
    character_bio: $scope.characterBioBinder,
    character_photo: $scope.characterPhotoBinder,
    id: $rootScope.tempIndex
  }; // end characterObject
    $http({
      method: 'POST',
      url: '/addCharacter',
      data: characterObject
    }); //end $http
  $scope.characterNameBinder = '';
  $scope.characterTraitBinderOne = '';
  $scope.characterTraitBinderTwo = '';
  $scope.characterTraitBinderThree = '';
  $scope.characterBioBinder = '';
  $scope.characterPhotoBinder = '';
  userData.getAllStories();
}; // end addChar

$scope.displayBefore = true;
$scope.displayAfter = false;
$scope.cleanText = '';

$scope.captureStoryInput = function() {
  if ($scope.pageTextBinder === '' || $scope.pageTextBinder === undefined || $scope.pageTextBinder === null){
    window.alert('Text field can not be left empty.\nPlease enter a story.');
  // } else if ($scope.pageNumberBinder === '' || $scope.pageNumberBinder === undefined || $scope.pageNumberBinder === null){
  //   window.alert('Page number can not be left empty.\nPlease enter a page number.');
  } else {
    $scope.cleanText = $scope.pageTextBinder; // stores copy of original clean text
    $scope.tempTextArray = $scope.pageTextBinder;
    $scope.tempTextArray = $scope.tempTextArray.replace(/\n/g, ''); // removes page breaks
    $scope.stringLength = $scope.tempTextArray.split(/[^\s]+/).length - 1; // counts total words excluding spaces
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
  var pageObject = {
    page_number: $scope.pageNumberBinder,
    page_text_plain: $scope.cleanText,
    page_text_btn: $scope.newTextArray,
    page_illustration: $scope.pageIllustrationBinder,
    id: $rootScope.tempIndex
  }; // end pageObject
  $http({
    method: 'POST',
    url: '/addPage',
    data: pageObject
  }).then(function() {
    $scope.textReset();
  }); // end $http
}; // end saveStory

$scope.editPage = function(index) {
  $rootScope.tempPageId = '';
  console.log($rootScope.storyIndex.story_pages[index].id);
  $rootScope.tempPageId = $rootScope.storyIndex.story_pages[index].id;

};

}]);
