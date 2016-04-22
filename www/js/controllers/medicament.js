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
app.controller('MedicamentCreateCtrl', function($scope) {

  $scope.addMedicament = function (form) {

    console.log("MedicamentCreateCtrl::addMedicament");

    if(form.$valid) {

    } else {
      console.log("Invalid form");
    }
  };


  $scope.addPicture = function () {
    console.log("Let's add a picture!");

  };

});
