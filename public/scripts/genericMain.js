angular.module('myApp').controller('genericMainController',
['$scope', '$http', '$uibModal', '$rootScope', '$location', '$sce', 'userData',
function($scope, $http, $uibModal, $rootScope, $location, $sce, userData){

  // uncomment this if you want only authorized users access this page
  // userData.checkAuth();

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

//---------------------------------------------------  TEST  -------------------------------------------------

  $scope.tempTextArray = [];
  $scope.checkedArray = [];
  $scope.checkShow = false;

  $scope.captureStoryInput = function() {
    $scope.tempTextArray = [];
    $scope.storyShow = true;
    var currentSentence = $scope.testAreaText;
    if (currentSentence === ''){
      window.alert('Text field can not be left empty.\ Please enter a story.'); // <--  DOESNT WORK.... GAH!!!!  >:(
    } else {
      $scope.stringLength = currentSentence.split(/[^\s]+/).length - 1;
      currentSentence = currentSentence.split(' ');
      for (var i = 0; i < $scope.stringLength; i++) { // for loop 1
        var taggedWord = '<input type="checkbox" onclick="setWordTrue('+ i +')" id="wordNum'+ i +'">' + currentSentence[i] + ' ';
        $scope.tempTextArray.push(taggedWord);
        currentSentence.splice(i, 0);
      } // end for loop 1
    } // end else
    var textDiv = angular.element(document.querySelector('#adminStory'));
    var userDiv = angular.element(document.querySelector('#userStory'));
    textDiv.empty();
    userDiv.empty();
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

  $scope.showParsedStory = function() {
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
    var parsedTextArrayDisplay = $rootScope.newTextArray.join(' ');
    parsedText.append(parsedTextArrayDisplay);
    $rootScope.newTextArray = [];   // <--- DO NOT TOUCH!!!
    $scope.tempTextArray = [];     // <--- DO NOT TOUCH!!!
    $scope.checkedArray = [];   // <--- DO NOT TOUCH!!!
  }; // end showParsedStory

  openTextPopup = function(num) {
    $rootScope.tempIdNum = num;
    var uncleanWord = document.getElementById('wordMadlib' + num).innerHTML;
    var cleanWord = uncleanWord.replace(/[^a-zA-Z]/g,'');
    $rootScope.wordByElementId = cleanWord;
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



//------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------------


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
