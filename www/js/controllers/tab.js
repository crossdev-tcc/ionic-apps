angular.module('minifarma.controllers.tab', [])

  .controller('TabCtrl', function($scope, $state) {

    $scope.createMedicament = function() {
      $state.go('createMedicament');
    };
  });
