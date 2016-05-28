var app = angular.module('minifarma.controllers.alert', []);

/**********************************
 *  Factories
 **********************************/

app.factory('Alert', function() {
  var alert = {};
  alert.startDate = null;//aux variable
  alert.startTime= null;//aux variable
  alert.presentCorrectTime = null;//aux variable
  alert.startDateTime = null;
  alert.id_medicament = null;
  alert.id_interval = null;
  alert.durationNumber = null;
  alert.durationUnity = null;
  alert.active = 1;
  return alert;
});

app.factory('Medicament', function() {

  var medicament = {};
  medicament.name = '';
  medicament.id = 0;
  return medicament;
});

/**********************************
 *  AlertListCtrl
 **********************************/
app.controller('AlertListCtrl', function($scope, AlertService, MedicamentService, IntervalService) {

  $scope.isAndroid = ionic.Platform.isAndroid();
  $scope.filterValue = 1;
  $scope.intervals = IntervalService.intervals;

  AlertService.all().then(function(alertsResult){
    $scope.alertas = alertsResult;
  });

  $scope.getMedicamentName = function (alerta) {
    var id_medicament = alerta.id_medicament;
    MedicamentService.getById(id_medicament).then(function(medicament){
      alerta.medicament_name = medicament.name;
    });
  };

  $scope.remove = function(alerta) {
    AlertService.remove(alerta);
    $scope.alertas.splice($scope.alertas.indexOf(alerta), 1);
  };

  $scope.defineNextDate = function (alerta) {

    var interval = $scope.intervals[alerta.id_interval];
    var now = new Date();
    var nextDoseDate = new Date(alerta.startDate);

    while(nextDoseDate < now) {
      nextDoseDate = nextDoseDate.setSeconds(3600 * interval);
    };

    alerta.nextDoseDate = dateFormat(nextDoseDate, "dd/mm/yyyy HH:MM");
    
  };

});

/**********************************
 *  AlertCreateCtrl
 **********************************/
app.controller('AlertCreateCtrl', function($scope, $state, ionicDatePicker, ionicTimePicker, Alert, Medicament, AlertService) {

  $scope.alert = Alert;
  $scope.medicament = Medicament;

  var dateSelecter = {
    callback: function (val) {
      $scope.alert.startDate = val;
    }
  };

  var timeSelecter = {
    callback: function (val) {

      var selectedTime = new Date(val * 1000);
      var hour = selectedTime.getUTCHours();
      var minute = selectedTime.getUTCMinutes();
      $scope.alert.presentCorrectTime = hour + ":" + minute;

      $scope.alert.startTime = val * 1000;
    },
    inputTime: ((new Date()).getHours() * 60 * 60),
    format: 24,
    step: 15,
    setLabel: 'Ok'
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(dateSelecter);
  };

  $scope.openTimePicker = function(){
    ionicTimePicker.openTimePicker(timeSelecter);
  };

  $scope.addAlert = function (form) {

    console.log("AlertCreateCtrl::addAlert");

    if(form.$valid) {
      var d = new Date($scope.alert.startDate + $scope.alert.startTime);
      $scope.alert.startDateTime = d;
      $scope.alert.active = 1;
      $scope.alert.id_medicament = $scope.medicament.id;

      AlertService.insert($scope.alert);
      $state.go('tab.alerta');
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
app.controller('MedicamentAlertListCtrl', function($scope, $ionicHistory, Medicament, MedicamentService, $ionicConfig) {

  $ionicConfig.backButton.text("Alerta");

  MedicamentService.all().then(function(remediosResult){
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
