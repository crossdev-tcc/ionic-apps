angular.module('minifarma.controllers.tab', [])

  .controller('TabCtrl', function($scope, $state) {

    $scope.isIOS = ionic.Platform.isIOS();

    $scope.createMedicament = function() {
      $state.go('createMedicament');
    };
  });
