angular.module('myApp').controller("getUserInfo", ['$http', '$scope', '$rootScope','$location', 'userData','$uibModal', function($http, $scope, $rootScope, $location, userData, $uibModal){

  $scope.getUsers = function() {
    $http({
      method: 'GET',
      url: '/getUsers', }).then(function(response){
        console.log(response);
        $rootScope.usersArray = response.data;
      }); // end http GET
  }; // end getUsers
console.log('outside of get users');
$scope.editUser = function(index){
  console.log('button clicked');
  $rootScope.usersIndex = $rootScope.usersArray[index]._id;
  $uibModal.open({
    templateUrl:'views/pages/updateUser.html',
    controller:'updateUserModal',
    size:'med',
    resolve:{
      userId: function(){
        return index;
      }
    }

  });
  console.log('users', $rootScope.usersIndex);
};
$scope.updateUser = function(id){
  var updateInfo = {
    id: $rootScope.usersArray[id]._id,
    name: $scope.nameUpdate,
    email: $scope.emailUpdate,
    username: $scope.username,
    grade: $scope.gradeUpdate,
    birthday: $scope.bdayUpdate,
    admin: $scope.adminUpdate
  };
console.log(updateInfo);
$http({
  method: 'PUT',
  url: '/userUpdate',
  data: updateInfo
}).then(function(response){
  $scope.getUsers();
});
$rootScope.cancel();
};

$scope.deleteUser = function(id) {
  console.log('button clicked');
  var userToDelete ={
    id: $rootScope.usersArray[id]._id
  };
  console.log(userToDelete);
  $http({
    method: 'DELETE',
    url: '/deleteUserInfo',
    data: userToDelete,
    headers: {'Content-Type': 'application/json;charset=utf-8'}
  });
};

}]);

angular.module('myApp').controller('updateUserModal', function($scope, $uibModalInstance, $rootScope, userId){
$rootScope.id = userId;
$scope.nameUpdate = $rootScope.usersArray[userId].name;
$scope.emailUpdate = $rootScope.usersArray[userId].email;
$scope.username = $rootScope.usersArray[userId].username;
$scope.gradeUpdate = $rootScope.usersArray[userId].grade;
$scope.bdayUpdate = $rootScope.usersArray[userId].birthday;
$scope.adminUpdate = $rootScope.usersArray[userId].admin;

$rootScope.cancel = function(){
  $uibModalInstance.close();
};

});
