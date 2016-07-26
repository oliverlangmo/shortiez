angular.module('myApp').controller('readerLandingPageCtrl',
['$scope', '$http', '$rootScope', '$location', 'userData',
function ($scope, $http, $rootScope, $location, userData) {


// userData.checkAuth();

$rootScope.stories = [];
// $scope.currentStory = [];

$scope.pageIndex = 0;
$scope.currentStory = $rootScope.readerIndex.story_pages;
// $scope.myStory = $scope.story[$scope.index];
console.log(' 2 index', $rootScope.readerIndex);
event.preventDefault();
console.log("show story in readerLandingPage");
$scope.getAllStories = function(){
  console.log("button clicked");
  $http({
    method: 'GET',
    url: '/getStories',
    }).then(function(response){
      $rootScope.stories = response.data;
      console.log('looking for stories ',response.data);
    }); // end http GET
}; // end getUsers



$scope.nextPage = function(){
          console.log(" next clicked");
          $scope.pageIndex++;
          console.log('$scope.pageIndex++;', $scope.pageIndex);
          if( $scope.pageIndex == $rootScope.stories[index].story_pages.length ){
            $scope.pageIndex = 0;
          }
          console.log( "in nextPage() $scope.pageIndex ", $scope.pageIndex  );
          $scope.getAllStories();//refresh page on the next 'click'
          event.preventDefault();

        };
        $scope.prevPage = function(){
        console.log(" prev clicked");
          $scope.pageIndex--;
          if( $scope.pageIndex === -1 ){
            $scope.pageIndex = $rootScope.stories[index].story_pages.length - 1;
          }
          $scope.getAllStories();//refresh page on the previous 'click'
          event.preventDefault();
        };


}]);//end of libraryCtrl controller
