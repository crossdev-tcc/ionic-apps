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
app.controller('MedicamentCreateCtrl', function($scope,
                                                $state,
                                                $cordovaCamera) {

  $scope.addMedicament = function (form) {

    console.log("MedicamentCreateCtrl::addMedicament");

    if(form.$valid) {

    } else {
      console.log("Invalid form");
    }
  };

  $scope.addPicture = function () {
    console.log("Let's add a picture!");
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY, // CAMERA
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 480,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.picture = imageData;
    }, function (err) {
      console.error(err);
      $ionicPopup.alert({
        title:'Error getting picture',
        subTitle: 'We had a problem trying to get that picture, please try again'
      });
    });

  };

  $scope.cancelCreate = function () {
    $state.go('tab.remedio');
  };

});
