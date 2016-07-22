myApp.controller('adminAddStoryController',[ '$scope', '$http', function( $scope, $http ){
   console.log('adminAddStoryController is loaded');

   $scope.addStory = function(){ // adds issue on button click

     console.log("addStory hit");

    var storyToCreate ={  // package object to send, with inputs
      story_title: $scope.storyTitleBinder,
      story_cover: $scope.storyCoverBinder,
    }; //end objectToSend

console.log(storyToCreate, "storyToCreate");

  $http({  // sends object via POST
        method: 'POST',
        url: '/addStory',
        data: storyToCreate
      }); //end $http
      
      $scope.storyTitleBinder ='';  // clears input boxes
      $scope.storyCoverBinder ='';

  };//end addStory


}]);
