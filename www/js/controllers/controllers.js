angular.module('minifarma.controllers', [
    'minifarma.controllers.medicament',
    'minifarma.controllers.tab'
])

.controller('AlertaCtrl', function($scope, Alertas) {
  $scope.alertas = Alertas.all();
  $scope.remove = function(alerta) {
    Alertas.remove(alerta);
  };
});
