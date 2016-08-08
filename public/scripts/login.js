angular.module('myApp').controller('loginController',['$scope', '$http', '$uibModal', '$rootScope', '$location', 'userData',
function($scope, $http, $uibModal, $rootScope, $location, userData){

  userData.getAllStories();

  $scope.setPrivileges = function(){
    var getUserInfo = {
      username: $scope.userNameInfo
    }; // end getUserInfo
    console.log('in setPrivileges', getUserInfo);
    $http({
      method: 'POST',
      url: '/getUserCheck',
      data: getUserInfo
    }).then(function(response){

      console.log('username', response.data.username);
      console.log('is auth?', response.data.auth);

      if (typeof(Storage) !== undefined) {
        sessionStorage.setItem('userPermissionAdmin', response.data.admin);
        sessionStorage.setItem('userAuthPermission', response.data.auth);
        sessionStorage.setItem('loggedInUser', response.data.username);
      } // end if
    }); // end $http
  }; // end setPrivileges

  $scope.openLogout = function(){
    $uibModal.open({
      templateUrl: 'views/pages/logout.html',
      controller: 'logoutModalController',
      size: 'sm'
    }); // end $modal.open
  }; // end openLogout

  $scope.logout = function(){
    $rootScope.userAdminCheck = false;
    $rootScope.userAuthCheck = false;
    $http({
      method: 'GET',
      url: '/logout'
    });
    $scope.cancel();
    $location.path('/#/login');
    $rootScope.userBtns = false;
    $rootScope.adminBtns = false;
  }; // end logout

}]); // end controller 'genericMainController'

//-----------------------------------------  logoutModalController -----------------------------------------

angular.module('myApp').controller('logoutModalController',
function ($scope, $uibModalInstance, $rootScope) {

  $scope.cancel = function(){
    $uibModalInstance.close();
  }; // end cancel

}); // end logoutModalController
