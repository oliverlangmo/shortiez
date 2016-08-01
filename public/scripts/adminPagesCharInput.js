myApp.controller('adminStoryInputController',
['$scope', '$http', '$rootScope', '$location', 'userData',
function($scope, $http, $rootScope, $location, userData){

  // uncomment this if you want admins to access this page
  // userData.adminCheck();

  userData.getAllStories();
    console.log($rootScope.tempIndex, "tempIndex");
  // $rootScope.stories = [];
  // $scope.myStory = [];
  $scope.characters=[];
  $scope.pages = [];

  // $scope.adminStoryLoad = function (){
  //   // $scope.currentStory = $rootScope.storyIndex.story_pages;
  //   $scope.characters = $rootScope.storyIndex.story_characters;
  //   $scope.pages = $rootScope.storyIndex.story_pages;
  //   // console.log("adminStoryLoad hit");
  //   console.log($rootScope.storyIndex, "storyIndex");
  //   console.log($scope.characters, "characters");
  //   console.log($scope.pages, "pages");
  // };//end adminStoryLoad()

   $scope.addChar = function(){ // adds issue on button click
    var characterObject ={  // package object to send, with inputs
      character_name: $scope.characterNameBinder,
      character_traits: [ $scope.characterTraitBinderOne, $scope.characterTraitBinderTwo, $scope.characterTraitBinderThree],
      character_bio: $scope.characterBioBinder,
      character_photo: $scope.characterPhotoBinder,
      id : $rootScope.tempIndex
    }; //end objectToSend
    $http({  // sends object via POST
          method: 'POST',
          url: '/addCharacter',
          data: characterObject
        }); //end $http
        console.log("New Character Sent", characterObject);


        $scope.characterNameBinder ='';  // clears input boxes
        $scope.characterTraitBinderOne ='';
        $scope.characterTraitBinderTwo ='';
        $scope.characterTraitBinderThree ='';
        $scope.characterBioBinder ='';
        $scope.characterPhotoBinder = '';

  };//end addChar



  $scope.addPage = function(){ // adds issue on button click
   var pageObject ={  // package object to send, with inputs
     page_number: $scope.pageNumberBinder,
     page_text: $scope.pageTextBinder,
     page_illustration: $scope.pageIllustrationBinder,
     id : $rootScope.tempIndex
   }; //end objectToSend
   $http({  // sends object via POST
     method: 'POST',
     url: '/addPage',
     data: pageObject
   }); //end $http
  $scope.pageNumberBinder ='';  // clears input boxes
  $scope.pageTextBinder ='';
  $scope.pageIllustrationBinder = '';
 };//end addPage


}]);
