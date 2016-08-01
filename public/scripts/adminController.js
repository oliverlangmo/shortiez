angular.module('myApp').controller('adminController',
['$scope', '$http', '$uibModal', '$rootScope', '$location', '$sce', 'userData',
function($scope, $http, $uibModal, $rootScope, $location, $sce, userData){

// uncomment this if you want admins to access this page
// userData.adminCheck();


$scope.tempTextArray = [];  //  == array that holds all words as checked boxes.
$scope.checkedArray = [];  //  == array that only holds words that have been checked.
$scope.newTextArray = [];  //  == array that holds new text after check boxes have been removed and buttons applied.

function Story(storyText) {
  this.storyText = storyText;
} // end Story

$scope.captureStoryInput = function() {
  if ($scope.testAreaText === '' || $scope.testAreaText === undefined || $scope.testAreaText === null){
    window.alert('Text field can not be left empty.\nPlease enter a story.');
  } else {
    $scope.tempTextArray = $scope.testAreaText;
    $scope.stringLength = $scope.tempTextArray.split(/[^\s]+/).length - 1;
    $scope.tempTextArray = $scope.tempTextArray.split(' ');
    for (var i = 0; i < $scope.stringLength; i++) { // for loop 1
      var taggedWord = '<input type="checkbox" onclick="setWordTrue('+ i +')" id="wordNum'+ i +'">' + $scope.tempTextArray[i] + ' ';
      $scope.tempTextArray.splice(i, 1, taggedWord);
    } // end for loop 1
  } // end else
  var textDiv = angular.element(document.querySelector('#adminStory'));
  textDiv.empty();
  var textArrayDisplay = $scope.tempTextArray.join('');
  textDiv.append(textArrayDisplay);
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
  $rootScope.saveStoryArray = $scope.newTextArray;
  var textDiv = angular.element(document.querySelector('#adminStory'));
  var parsedText = angular.element(document.querySelector('#userStory'));
  textDiv.empty();
  var parsedTextArrayDisplay = $rootScope.saveStoryArray.join(' ');
  parsedText.append(parsedTextArrayDisplay);

  var storyPage = {
    page: $scope.newTextArray,
  };
  console.log(storyPage.page);
  $http({
    method: 'POST',
    url: '/addTestPage',
    data: storyPage
  }); //end $http

  $scope.newTextArray = [];
  $scope.tempTextArray = [];
  $scope.checkedArray = [];
  $scope.testAreaText = '';
  $scope.stringLength = '';
}; // end showParsedStory


}]); // end controller 'adminController'
