angular.module('myApp').controller("getUserInfo",
['$http', '$scope', '$rootScope','$location', 'userData', '$uibModal',
function($http, $scope, $rootScope, $location, userData, $uibModal){


// userData.adminCheck();
// userData.getBadWords();

$scope.badWordPopup = function() {
  $uibModal.open({
    templateUrl: 'views/pages/addBadWordPopup.html',
    controller: 'badWordsModal'
  }); // end $modal.open
}; // end badWordPopup

$scope.addNewBadWord = function(){
  console.log('in addNewBadWord', $rootScope.newBadWord);
  var badWordObj = {
    badWordsList: $rootScope.newBadWord
  }; // end object
  $http({
    method: 'POST',
    url: '/addNewBadWord',
    data: badWordObj
  }); // end POST
  $scope.badWordInput = '';
}; // end addNewBadWord function

$scope.getUsers = function() {
  $http({
    method: 'GET',
    url: '/getUsers', }).then(function(response) {
      $rootScope.usersArray = response.data;
    }); // end http GET
}; // end getUsers

$scope.editUser = function(index) {
  $rootScope.usersIndex = $rootScope.usersArray[index]._id;
  $uibModal.open({
    templateUrl:'views/pages/updateUser.html',
    controller:'updateUserModal',
    size:'med',
    resolve: {
      userId: function() {
        return index;
      } // end userId
    } // end resolve
  }); // end open modal
}; // end editUser

$scope.updateUser = function(id) {
  var updateInfo = {
    id: $rootScope.usersArray[id]._id,
    name: $scope.nameUpdate,
    email: $scope.emailUpdate,
    username: $scope.username,
    grade: $scope.gradeUpdate,
    birthday: $scope.bdayUpdate,
    admin: $scope.adminUpdate,
    auth: $scope.authUpdate
  };
  $http({
    method: 'PUT',
    url: '/userUpdate',
    data: updateInfo
  }); // end $http
  $rootScope.cancel();
  location.reload();
}; // end updateUser

$scope.deleteUser = function(id) {
  if(confirm('Are you sure you want to Delete this user?')) {
  var userToDelete ={
    id: $rootScope.usersArray[id]._id
  }; // end userToDelete
  $http({
    method: 'DELETE',
    url: '/deleteUserInfo',
    data: userToDelete,
    headers: {'Content-Type': 'application/json;charset=utf-8'}
  }); // end $http
  } else {
    return false;
  } // end else
  location.reload();
  }; // end deleteUserInfo

}]); // getUserInfo controller


angular.module('myApp').controller('updateUserModal', function($scope, $uibModalInstance, $rootScope, userId) {

  $rootScope.id = userId;
  $scope.nameUpdate = $rootScope.usersArray[userId].name;
  $scope.emailUpdate = $rootScope.usersArray[userId].email;
  $scope.username = $rootScope.usersArray[userId].username;
  $scope.gradeUpdate = $rootScope.usersArray[userId].grade;
  $scope.bdayUpdate = new Date($rootScope.usersArray[userId].birthday);
  $scope.adminUpdate = $rootScope.usersArray[userId].admin;
  $scope.authUpdate = $rootScope.usersArray[userId].auth;

  $rootScope.cancel = function() {
    $uibModalInstance.close();
  }; // end cancel

}); // end updateUSerModal controller

angular.module('myApp').controller('badWordsModal', function($scope, $uibModalInstance, $rootScope) {

  $rootScope.cancel = function() {
    $uibModalInstance.close();
  }; // end cancel

}); // end updateUSerModal controller
