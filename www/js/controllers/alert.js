var app = angular.module('minifarma.controllers.alert', []);

app.factory('Alert', function() {
  alert = {};
  alert.startDate = null;
  alert.medicamentId = null;
  alert.interval = null;
  alert.durationNumber = null;
  alert.durationUnity = null;
  alert.active = true;
  return alert;
});

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
app.controller('AlertCreateCtrl', function($scope, $state, ionicDatePicker, Alert) {

  $scope.alert = Alert;

  var dateSelecter = {
    callback: function (val) {
      $scope.alert.startDate = new Date(val)
      console.log('Return value from the datepicker popup is : ' + $scope.alert.startDate);
    }
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(dateSelecter);
  };

  $scope.addAlert = function (form) {

    console.log("AlertCreateCtrl::addAlert");

    if(form.$valid) {
      $scope.alert.durationNumber = form.duration.$viewValue;
      $scope.alert.durationUnity = form.durationUnity;
      $scope.alert.interval = form.interval.$viewValue;
      $scope.alert.active = true;
      // $scope.alert.medicamentId = form.medicamentId.$viewValue;
      console.log($scope.alert);
    } else {
      console.log("Invalid form");
    }
  };

  $scope.cancelCreate = function () {
    $state.go('tab.alerta');
  };

});
