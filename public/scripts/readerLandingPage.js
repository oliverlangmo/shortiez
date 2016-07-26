
angular.module('myApp').controller('readerLandingPageCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
console.log("in readerLandingPage.js");

// userData.checkAuth();

$rootScope.stories = [];

$scope.index = 0;
// $scope.myStory = $scope.story[$scope.index];

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
          $scope.index++;
          console.log('$scope.index++;', $scope.index);
          if( $scope.index == $scope.story.length ){
            $scope.index = 0;
          }
          console.log( "in nextPage() $scope.index ", $scope.index  );
          $scope.getAllStories();//refresh page on the next 'click'
          event.preventDefault();

        };
        $scope.prevPage = function(){
        console.log(" prev clicked");
          $scope.index--;
          if( $scope.index === -1 ){
            $scope.index = $scope.story.length - 1;
          }
          $scope.getAllStories();//refresh page on the previous 'click'
          event.preventDefault();
        };


}]);//end of libraryCtrl controller
