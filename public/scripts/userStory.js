angular.module('myApp').controller('userStoryController',
['$scope', '$http', '$rootScope', '$location', 'userData', '$mdSidenav',
function ($scope, $http, $rootScope, $location, userData, $mdSidenav) {

// userData.checkAuth();

userData.getAllStories();

$rootScope.stories = [];
$scope.myStory = [];
$scope.characters=[];
$scope.pageIndex = 0;

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


$scope.selectReaderStory = function(index) {
  console.log('index', index);
  $rootScope.readerIndex = $rootScope.stories[index];
  var path = "#userLibrary";
  window.location.href = path;
};

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

$scope.myStoryLoad = function (){
  $scope.currentStory = $rootScope.readerIndex.story_pages;
  $scope.myStory = $scope.currentStory[$scope.pageIndex];
  $scope.characters = $rootScope.readerIndex.story_characters;

	window.scrollTo(0,0);

}; // end myStoryLoad()

$scope.nextPage = function(){
  console.log( "next clicked" );
  $scope.pageIndex++;
  console.log('$scope.pageIndex++;', $scope.pageIndex);
  if( $scope.pageIndex == $scope.currentStory.length ){
    $scope.pageIndex = 0;
  } // end if
  console.log( "in nextPage() $scope.pageIndex", $scope.pageIndex  );
  $scope.myStoryLoad();
  event.preventDefault();
}; // end nextPage()

$scope.prevPage = function(){
  console.log( "prev clicked" );
  $scope.pageIndex--;
  if( $scope.pageIndex === -1 ){
    $scope.pageIndex = $scope.currentStory.length - 1;
  } // end if
  $scope.myStoryLoad();
  event.preventDefault();
}; // end prevPage()
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
}]);//end of libraryCtrl controller
