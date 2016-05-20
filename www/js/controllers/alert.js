var app = angular.module('minifarma.controllers.alert', []);

/**********************************
 *  Factories
 **********************************/

app.factory('Alert', function() {
  var alert = {};
  alert.startDateTime = null;
  alert.medicamentId = null;
  alert.interval = null;
  alert.durationNumber = null;
  alert.durationUnity = null;
  alert.active = true;
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
app.controller('AlertCreateCtrl', function($scope, $state, ionicDatePicker, ionicTimePicker, Alert, Medicament, AlertService) {

  $scope.alert = Alert;
  $scope.medicament = Medicament;
  $scope.startDate = null;
  $scope.startTime = null;
  $scope.presentCorrectTime = null;

  var dateSelecter = {
    callback: function (val) {
      $scope.startDate = val;
    }
  };

  var timeSelecter = {
    callback: function (val) {

      var selectedTime = new Date(val * 1000);
      var hour = selectedTime.getUTCHours();
      var minute = selectedTime.getUTCMinutes();
      $scope.presentCorrectTime = hour + ":" + minute;

      $scope.startTime = val * 1000;
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
      $scope.alert.durationNumber = form.duration.$viewValue;
      $scope.alert.durationUnity = form.durationUnity;
      $scope.alert.interval = form.interval.$viewValue;
      $scope.alert.medicamentId = $scope.medicament.id;
      $scope.alert.active = true;
      $scope.alert.startDateTime = new Date($scope.startDate + $scope.startTime);
      console.log($scope.alert);
      // AlertService.insert($scope.alert);
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

app.controller('MedicamentAlertListCtrl', function($scope, $ionicHistory, Medicament,
                                                   MedicamentService,
                                                   $ionicConfig) {

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
