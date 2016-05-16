var app = angular.module('minifarma.controllers.alert', []);

/**********************************
 *  Factories
 **********************************/

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

app.factory('Medicament', function() {

  medicament = {};
  medicament.name = '';
  medicament.id = 0;
  return medicament;
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
app.controller('AlertCreateCtrl', function($scope, $state, ionicDatePicker, Alert, Medicament) {

  $scope.alert = Alert;
  $scope.medicament = Medicament;

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
      $scope.alert.medicamentId = $scope.medicament.id;
      $scope.alert.active = true;
      console.log($scope.alert);
    } else {
      console.log("Invalid form");
    }
  };

  $scope.cancelCreate = function () {
    $state.go('tab.alerta');
  };

});

/**********************************
 *  MedicamentAlertListCtrl
 **********************************/

app.controller('MedicamentAlertListCtrl', function($scope, $ionicHistory, Medicament) {

  Medicament.all().then(function(remediosResult){
    $scope.medicaments = remediosResult
  });
  $scope.selectedMedicament = Medicament;
  $scope.shouldShowDelete = false;

  $scope.select = function(medicamentName, medicamentId) {
    $scope.selectedMedicament.name = medicamentName;
    $scope.selectedMedicament.id = medicamentId;
    $ionicHistory.goBack();
  };

});
