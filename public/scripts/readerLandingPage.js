angular.module('myApp').controller('readerLandingPageCtrl', ['$scope', '$http', '$rootScope', '$location', 'userData', '$mdSidenav',
function ($scope, $http, $rootScope, $location, userData, $mdSidenav) {

// userData.checkAuth();

$rootScope.stories = [];
$scope.myStory = [];
$scope.characters=[];
$scope.pageIndex = 0;


// $scope.openLeftMenu = function() {
//     $mdSidenav('left').toggle();
//   };//end sidenav

$scope.myStoryLoad = function (){
  $scope.currentStory = $rootScope.readerIndex.story_pages;
  $scope.myStory = $scope.currentStory[$scope.pageIndex];
  $scope.characters = $rootScope.readerIndex.story_characters;
};//end myStoryLoad()

    $scope.nextPage = function(){
          console.log(" next clicked");
          $scope.pageIndex++;
          console.log('$scope.pageIndex++;', $scope.pageIndex);
          if( $scope.pageIndex == $scope.currentStory.length ){
            $scope.pageIndex = 0;
          }//end if
          console.log( "in nextPage() $scope.pageIndex ", $scope.pageIndex  );
          $scope.myStoryLoad();
          event.preventDefault();
        };//end nextPage()

        $scope.prevPage = function(){
        console.log(" prev clicked");
          $scope.pageIndex--;
          if( $scope.pageIndex === -1 ){
            $scope.pageIndex = $scope.currentStory.length - 1;
          }//end if
          $scope.myStoryLoad();
          event.preventDefault();
        };//end prevPage()

}]);//end of libraryCtrl controller
