var app = angular.module('minifarma.controllers.alert', []);

/**********************************
 *  AlertListCtrl
 **********************************/
app.controller('AlertListCtrl', function($scope, Alertas) {

  $scope.isAndroid = ionic.Platform.isAndroid();

  $scope.data =  {
    "filter" : true,
    "alertas": Alertas.all()
  };

  $scope.remove = function(alerta) {
    Alertas.remove(alerta);
  };
});


/**********************************
 *  AlertCreateCtrl
 **********************************/
app.controller('AlertCreateCtrl', function($scope,
                                           $state) {

  $scope.addAlert = function (form) {

    console.log("AlertCreateCtrl::addAlert");

    if(form.$valid) {

    } else {
      console.log("Invalid form");
    }
  };

  $scope.cancelCreate = function () {
    $state.go('tab.alerta');
  };

});

