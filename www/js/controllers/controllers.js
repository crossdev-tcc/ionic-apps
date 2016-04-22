angular.module('minifarma.controllers', [])

.controller('AlertaCtrl', function($scope, Alertas) {
  $scope.alertas = Alertas.all();
  $scope.remove = function(alerta) {
    Alertas.remove(alerta);
  };
});
