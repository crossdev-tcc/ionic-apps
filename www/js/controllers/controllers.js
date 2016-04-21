angular.module('starter.controllers', [])


// .controller('DashCtrl', function($scope) {})

.controller('RemedioCtrl', function($scope, Remedios) {

  $scope.$on('mapInitialized', function (event, map) {
    $scope.map = map;
  });

  $scope.remedios = Remedios.all();
  $scope.remove = function(remedio) {
    Remedios.remove(remedio);
  };

})

.controller('AlertaCtrl', function($scope, Alertas) {
  $scope.alertas = Alertas.all();
  $scope.remove = function(alerta) {
    Alertas.remove(alerta);
  };
});
