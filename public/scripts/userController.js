angular.module('myApp').controller('userController',
['$scope', '$http', '$uibModal', '$rootScope', '$location', '$sce', 'userData',
function($scope, $http, $uibModal, $rootScope, $location, $sce, userData){

// uncomment this if you want only authorized users access this page
// userData.checkAuth();

$scope.getPage = function() {
  $http({
    method: 'GET',
    url: '/getPage',
    }).then(function(response){
      console.log(response.data);
      $rootScope.page = response.data;
    }); // end http GET
}; // end getPage

$scope.showPage = function() {
  console.log("button clicked");
  $scope.getPage();
};

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
}; // end submitChange

}]); // end controller 'userController'

//-----------------------------------------  textPopupController -----------------------------------------

angular.module('myApp').controller('textPopupController',
function ($scope, $uibModalInstance, $rootScope) {

  $rootScope.cancel = function(){
    $uibModalInstance.close();
  }; // end cancel

}); // end textPopupController
