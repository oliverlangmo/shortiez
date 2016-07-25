
angular.module('myApp').controller('libraryCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
console.log("in libraryadmin.js");
$rootScope.stories = [];
// var storyObj = {
//   title: $scope.story_title,
//   image: $scope.story_cover
// };
event.preventDefault();
console.log("getting stories");
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
