angular.module('myApp').controller('genericMainController',
['$scope', '$http', '$uibModal', '$rootScope', '$location', '$sce', 'userData',
function($scope, $http, $uibModal, $rootScope, $location, $sce, userData){

  // uncomment this if you want only authorized users access this page
  // userData.checkAuth();

  $scope.user = {
    name: 'awesome user'
  };

  userData.getUsers();
  $scope.nameInput = '';

  $scope.addUser = function(){
    console.log('in addTempUser');
    var userInfo = {
      name: $scope.nameInput
    }; // end object
    $http({
      method: 'POST',
      url: '/addTempUser',
      data: userInfo
    }); // end POST
    $scope.nameInput = '';
    userData.getUsers();
  }; // end addUser function

  $scope.deleteUser = function(index){
    console.log('in deleteTempUser');
    var userId = {
      id: $rootScope.usersArray[index]._id
    }; // end userId
    $http({
      method: 'POST',
      url: '/removeTempUser',
      data: userId
    }); // end http
    $rootScope.usersArray.splice(index, 1);
  }; // end deleteUser

  $scope.openUpdate = function(index){
    console.log('in openUpdate');
    $uibModal.open({
      templateUrl: 'views/pages/updateUser.html',
      controller: 'modalController',
      size: 'sm',
      resolve: {
         userId: function(){
           return index;
         } // end userId
       } // end resolve
    }); // end $modal.open
  }; // end openUpdate

  $scope.updateUser = function(id){
    console.log('in updateUser');
    var updateInfo = {
      id: $rootScope.usersArray[id]._id,
      name: $scope.nameUpdate
    }; // end updateInfo
      $http({
        method: 'POST',
        url: '/updateTempUser',
        data: updateInfo
      }).then(function(response){
        userData.getUsers();
        $rootScope.cancel();
        } // end then
      ); // end http
  }; // end updateUser

  // $scope.findReplace = function(){
  //   var someText = $scope.storyInput;
  //   var someWord = $scope.oldWord;
  //   var regExp = new RegExp(someWord, 'gi');
  //   $scope.newText = someText.replace(regExp, $scope.newWord);
  // };

//---------------------------------------------------  TEST  -------------------------------------------------

  $scope.tempTextArray = [];
  $scope.checkedArray = [];
  $scope.checkShow = false;
  // $rootScope.wordToChange = '';

  RegExp.escape = function(word) {
    return word.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
  }; // end RegExp.escape

  $scope.captureStoryInput = function() {
    $scope.tempTextArray = [];
    $scope.storyShow = true;
    var currentSentence = $scope.testAreaText;
    if (currentSentence === ''){
      window.alert('Text field can not be left empty.\ Please enter a story.'); // <--  DOESNT WORK.... GAH!!!!  >:(
    } else {
      $scope.stringLength = currentSentence.split(/[^\s]+/).length - 1;
      for (var i = 0; i < $scope.stringLength ; i++) { // for loop 1
        $scope.tempTextSpotOne = currentSentence.split(' ').slice(0,1).join('').trim();
        $scope.tempTextSpotOne = RegExp.escape($scope.tempTextSpotOne);
        var regExp = new RegExp($scope.tempTextSpotOne, 'i');
        $scope.newString = currentSentence.replace(regExp, '').trim();
        currentSentence = $scope.newString;
        var taggedWord = '<input type="checkbox" onclick="setWordTrue('+ i +')" id="wordNum'+ i +'">' + $scope.tempTextSpotOne + ' ';
        $scope.tempTextArray.push(taggedWord);
      } // end for loop 1
    } // end else
    var textDiv = angular.element(document.querySelector('#adminStory'));
    textDiv.empty();
    var textArrayDisplay = $scope.tempTextArray.join('');
    textDiv.append(textArrayDisplay);
  }; // end captureStoryInput

  setWordTrue = function(num) {
    $scope.checkedWord = $scope.tempTextArray[num ];   // -1
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

  $scope.showParsedStory = function() {
    $rootScope.newTextArray = [];
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
      $rootScope.newTextArray.push(parsedWord);
    } // end for loop 1
    var parsedText = angular.element(document.querySelector('#userStory'));
    parsedText.empty();
    $scope.parsedTextArrayDisplay = $rootScope.newTextArray.join(' ');
    parsedText.append($scope.parsedTextArrayDisplay);
  }; // end showParsedStory

  openTextPopup = function(num) {
    $rootScope.tempIdNum = num;
    var uncleanWord = document.getElementById('wordMadlib' + num).innerHTML;
    // var cleanWord = uncleanWord.replace(/[^a-zA-Z]/g,'');
    $rootScope.wordByElementId = uncleanWord; // <--cleanedWord
    $uibModal.open({
      templateUrl: 'views/pages/textPopup.html',
      controller: 'textPopupController',
      size: 'sm'
    }); // end $modal.open
  }; // end openTextPopup

  $scope.submitChange = function (){
    var num = $rootScope.tempIdNum;
    var newTaggedWord = '<button class="wordBtn" id="wordMadlib'+ num +'" onclick="openTextPopup('+ num +')">' + $scope.newWord + '</button> ';
    $rootScope.newTextArray.splice((num), 1, newTaggedWord);
    var parsedText = angular.element(document.querySelector('#userStory'));
    parsedText.empty();
    var parsedTextArrayDisplay = $rootScope.newTextArray.join(' ');
    parsedText.append(parsedTextArrayDisplay);
    $rootScope.cancel();
  };

<<<<<<< HEAD
//------------------------------------------------------------------------------------------------------------

=======
>>>>>>> 6e187e9d03f85271f2e947d037455b255ac06fcb

}]); // end controller 'genericMainController'

//-----------------------------------------  textPopupController -----------------------------------------

angular.module('myApp').controller('textPopupController',
function ($scope, $uibModalInstance, $rootScope) {

  $rootScope.cancel = function(){
    $uibModalInstance.close();
  }; // end cancel
}); // end logoutModalController

//-----------------------------------------  modalController -----------------------------------------

angular.module('myApp').controller('modalController',
function ($scope, $uibModalInstance, $rootScope, userId) {

  $rootScope.id = userId;
  $scope.nameUpdate = $rootScope.usersArray[userId].name;

  $rootScope.cancel = function(){
    $uibModalInstance.close();
  }; // end cancel
}); // end modalController

// $rootScope.stringifiedWord = wordByElement.outerHTML;
// var frontStrippedWord = $rootScope.wordByElement.replace('<button class="wordBtn" id="wordMadlib'+ someNum +'" onclick="openTextPopup('+ someNum +')">', '');
// var cleanedWord = frontStrippedWord.replace('</button>', '');
// $rootScope.wordToChange = cleanedWord;


// for (var i = 0; i < $scope.tempTextArray.length; i++) {
//   console.log('INSIDE array', $scope.tempTextArray[0]);
//   if($scope.tempTextArray[i] === wordToEdit){
//     console.log('INSIDE array', $scope.tempTextArray[i]);
//     frontStripped = $scope.tempTextArray[i].replace('<button  id="wordMadlib'+ someNum +'" onclick="openTextPopup('+ someNum +')" ">', '').trim();
//     cleanedWord = frontStripped.replace('</button> ', '').trim();
//     $rootScope.tempWord = cleanedWord;
//   }
// }



// frontStripped = $scope.tempTextArray[i].replace('<button  id="wordMadlib'+ someNum +'" onclick="openTextPopup('+ someNum +')" ">', '').trim();
// cleanedWord = frontStripped.replace('</button> ', '').trim();
// $rootScope.tempWord = cleanedWord;



// console.log('wordToEdit', $scope.wordToEdit);
// frontStripped = $scope.wordToEdit.replace('<button  id="wordMadlib'+ someNum +'" onclick="openTextPopup('+ someNum +')" ">', '').trim();
// cleanedWord = $scope.wordToEdit.replace('</button> ', '').trim();
// $rootScope.tempWord = cleanedWord;



// for (var i = 0; i < $rootScope.newTextArray.length; i++) {
//   var numId = i + 1;
//   if ($rootScope.newTextArray[i] === $rootScope.wordByElement) {
//     var newTaggedWord = '<button class="wordBtn" id="wordMadlib'+ numId +'" onclick="openTextPopup('+ numId +')">' + $scope.newWord + '</button> ';
//     $rootScope.newTextArray.splice(i, 1, newTaggedWord);
//    } // end if
//  } // end for loop
//
