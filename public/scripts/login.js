angular.module('myApp').controller('loginController',['$scope', '$http', '$uibModal', '$rootScope', '$location', 'userData',
function($scope, $http, $uibModal, $rootScope, $location, userData){

  // loads stories from DB upon login
  userData.getAllStories();

  // setPrivileges returns from server user permissions that tells what the user can or can't see after logging in and
  // and stores the information locally until the user closes the browser.
  $scope.setPrivileges = function(){
    var getUserInfo = {
      username: $scope.userNameInfo
    }; // end getUserInfo
    $http({
      method: 'POST',
      url: '/getUserCheck',
      data: getUserInfo
    }).then(function(response){
      if (typeof(Storage) !== undefined) {
        sessionStorage.setItem('userPermissionAdmin', response.data.admin);
        sessionStorage.setItem('userAuthPermission', response.data.auth);
        sessionStorage.setItem('loggedInUser', response.data.username);
      } // end if
    }); // end $http
  }; // end setPrivileges

  // opens a modal popup then redirects user to logout option
  $scope.openLogout = function(){
    $uibModal.open({
      templateUrl: 'views/pages/logout.html',
      controller: 'logoutModalController',
      size: 'sm'
    }); // end $modal.open
  }; // end openLogout

  // logs user out then resets permissions and button views
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
