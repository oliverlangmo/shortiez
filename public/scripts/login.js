angular.module('myApp').controller('loginController',['$scope', '$http', '$uibModal', '$rootScope', '$location', 'userData',
function($scope, $http, $uibModal, $rootScope, $location, userData){

  $scope.setPrivileges = function(){
    var getUserInfo = {
      username: $scope.userNameInfo
    }; // end getUserInfo
    $http({
      method: 'POST',
      url: '/getUserCheck',
      data: getUserInfo
    }).then(function(response){
      if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem('userPermissionAdmin', response.data.admin);
        sessionStorage.setItem('userAuthPermission', response.data.auth);
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
  }; // end logout

}]); // end controller 'genericMainController'

//-----------------------------------------  logoutModalController -----------------------------------------

angular.module('myApp').controller('logoutModalController',
function ($scope, $uibModalInstance, $rootScope) {

  $scope.cancel = function(){
    $uibModalInstance.close();
  }; // end cancel

}); // end logoutModalController
