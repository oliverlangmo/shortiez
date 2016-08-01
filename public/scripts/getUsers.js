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
    grade: $scope.grade,
    birthday: $scope.birthday,
    admin: $scope.admin
  };
console.log(updateInfo);
$http({
  method: 'POST',
  url: '/userUpdate',
  data: updateInfo
}).then(function(response){
  $scope.getUsers();
});
};

}]);

angular.module('myApp').controller('updateUserModal', function($scope, $uibModalInstance, $rootScope, userId){
$rootScope.id = userId;
$scope.nameUpdate = $rootScope.usersArray[userId].name;
$scope.emailUpdate = $rootScope.usersArray[userId].email;
$scope.username = $rootScope.usersArray[userId].username;
$scope.grade = $rootScope.usersArray[userId].grade;
$scope.birthday = $rootScope.usersArray[userId].birthday;
$scope.admin = $rootScope.usersArray[userId].admin;

$rootScope.cancel = function(){
  $uibModalInstance.close();
};

});
