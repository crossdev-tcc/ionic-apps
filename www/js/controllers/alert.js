var app = angular.module('minifarma.controllers.alert', []);

/**********************************
 *  Factories
 **********************************/

app.factory('Alert', function() {
  var alert = {};
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

app.controller('AlertListCtrl', function($scope, AlertService) {

  $scope.isAndroid = ionic.Platform.isAndroid();

  $scope.data =  {
    "filter" : true,
    "alertas": AlertService.all()
  };

  $scope.remove = function(alerta) {
    AlertService.remove(alerta);
  };
});

/**********************************
 *  AlertCreateCtrl
 **********************************/
app.controller('AlertCreateCtrl', function($scope, $state, ionicDatePicker, ionicTimePicker, Alert, Medicament, AlertService, IntervalService) {

  $scope.alert = Alert;
  $scope.medicament = Medicament;
  $scope.startDate = null;
  $scope.startTime = null;
  $scope.presentCorrectTime = null;

  //Objeto idIntervals funciona como uma dicionario
  //key: string
  //value: array<idIntervalo, numeroIntervalo, complementoString>
  $scope.idIntervals = IntervalService.intervals;

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
      var d = new Date($scope.startDate + $scope.startTime);
      $scope.alert.startDateTime = d;
      //se precisar salvar como numero de milisegundos desde 01/01/1970 basta colocar d.getTime()
      //depos para colocar no formato de data, basta criar uma data com esse valor - new Date(d)
      $scope.alert.durationNumber = form.duration.$viewValue;
      $scope.alert.durationUnity = form.durationUnity;
      $scope.alert.active = 1;
      $scope.alert.id_interval = $scope.idIntervals[form.interval.$viewValue][0];
      $scope.alert.id_medicament = $scope.medicament.id;

      console.log($scope.alert);
      // console.log(new Date(d));
      AlertService.insert($scope.alert);
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
