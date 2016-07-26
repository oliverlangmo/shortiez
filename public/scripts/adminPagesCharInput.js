myApp.controller('adminStoryInputController',[ '$scope', '$http',"$rootScope", function( $scope, $http, $rootScope ){
   console.log('adminStoryInputController is loaded');

   $scope.addChar = function(index){ // adds issue on button click
console.log(index);
    var characterObject ={  // package object to send, with inputs
      character_name: $scope.characterNameBinder,
      character_traits: $scope.characterTraitBinder,
      character_photo: $scope.characterPhotoBinder,
      id : $rootScope.stories[index]._id
    }; //end objectToSend

    $http({  // sends object via POST
          method: 'POST',
          url: '/addCharacter',
          data: characterObject
        }); //end $http

        console.log("New Character Sent", characterObject);

        $scope.characterNameBinder ='';  // clears input boxes
        $scope.characterTraitBinder ='';
        $scope.characterPhotoBinder = '';

  };//end addChar

  $scope.addPage = function(){ // adds issue on button click

   var pageObject ={  // package object to send, with inputs
     page_number: $scope.pageNumberBinder,
     page_text: $scope.pageTextBinder,
     page_illustration: $scope.pageIllustrationBinder,
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
