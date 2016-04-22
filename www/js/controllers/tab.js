angular.module('minifarma.controllers.tab', [])

  .controller('TabCtrl', function($scope, $window) {

    $scope.createMedicament = function() {
      $window.location.href = '/#/createMedicament';
    };
  });
