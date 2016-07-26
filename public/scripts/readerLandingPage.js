
angular.module('myApp').controller('readerLandingPageCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
console.log("in readerLandingPage.js");
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

angular.module('myApp').controller('readerLandingPageCtrl',
['$scope', '$http', '$rootScope', '$location', 'userData',
function ($scope, $http, $rootScope, $location, userData) {

  // uncomment this if you want only authorized users access this page
  // userData.checkAuth();


  $rootScope.stories = [];
  // var storyObj = {
  //   title: $scope.story_title,
  //   image: $scope.story_cover
  // };
  event.preventDefault();
  console.log("show story in readerLandingPage");
  //example GET for appending stories into library
  $scope.getAllStories = function(){
    console.log("button clicked");
    $http({
      method: 'GET',
      url: '/getStories',
      }).then(function(response){
        $rootScope.stories = response.data;
        console.log(response.data);
      }); // end http GET
  }; // end getUsers

  }]);//end of libraryCtrl controller
 
