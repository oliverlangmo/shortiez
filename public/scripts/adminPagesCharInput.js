myApp.controller('adminStoryInputController',[ '$scope', '$http', function( $scope, $http ){
   console.log('adminStoryInputController is loaded');

   $scope.addChar = function(){ // adds issue on button click

    var characterObject ={  // package object to send, with inputs
      character_name: $scope.characterNameBinder,
      character_traits: $scope.characterTraitBinder,
      character_photo: $scope.characterPhotoBinder,
    }; //end objectToSend

  };//end addChar

  $scope.addPage = function(){ // adds issue on button click

   var pageObject ={  // package object to send, with inputs
     page_number: $scope.pageNumberBinder,
     page_text: $scope.pageTextBinder,
     page_illustration: $scope.pageIllustrationBinder,
   }; //end objectToSend

 };//end addPage

}]);
