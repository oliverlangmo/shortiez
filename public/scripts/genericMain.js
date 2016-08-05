angular.module('myApp').controller('genericMainController',
['$scope', '$http', '$uibModal', '$rootScope', '$location', '$sce', 'userData',
function($scope, $http, $uibModal, $rootScope, $location, $sce, userData){

  userData.checkAuth();

  $scope.nameInput = '';
  $rootScope.usersArray = [];

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
        }); // end http
  }; // end updateUser



//---------------------------------------------------  TEST  -------------------------------------------------

  $scope.tempTextArray = [];  //   == array that holds all words as checked boxes
  $scope.checkedArray = [];  //   == array that only holds words that have been checked
  $scope.newTextArray = [];

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
    $scope.newTextArray = [];
    $scope.tempTextArray = [];
    $scope.checkedArray = [];
    $scope.testAreaText = '';
    $scope.stringLength = '';
  }; // end showParsedStory

//=------------------------------------------  USER  --------------------------------------------

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
    $rootScope.saveStoryArray.splice((num), 1, newTaggedWord);
    var parsedText = angular.element(document.querySelector('#userStory'));
    parsedText.empty();
    var parsedTextArrayDisplay = $rootScope.saveStoryArray.join(' ');
    parsedText.append(parsedTextArrayDisplay);
    $scope.checkedArray = [];
    $rootScope.cancel();
  };


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
