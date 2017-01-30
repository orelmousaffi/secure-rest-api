var userListCtrl = function($scope) {
  $scope.data = {
    users: [{
      email: 'test@test.com',
      passwordHash: '1234567890'
    },
    {
      email: 'test@gmail.com',
      passwordHash: '0987654321'
    }]
  };
};

angular.module('userDirApp', []).controller('userListCtrl', userListCtrl);
