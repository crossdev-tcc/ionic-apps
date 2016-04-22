var app = angular.module('minifarma.controllers.medicament', []);

/**********************************
 *  MedicamentListCtrl
 **********************************/
app.controller('MedicamentListCtrl', function($scope, Remedios) {

  $scope.$on('mapInitialized', function (event, map) {
    $scope.map = map;
  });

  $scope.remedios = Remedios.all();
  $scope.remove = function(remedio) {
    Remedios.remove(remedio);
  };

});

/**********************************
 *  MedicamentCreateCtrl
 **********************************/
