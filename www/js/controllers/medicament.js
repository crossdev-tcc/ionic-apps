var app = angular.module('minifarma.controllers.medicament', []);

/**********************************
 *  MedicamentListCtrl
 **********************************/
app.controller('MedicamentListCtrl', function($scope, Remedios) {
  
  $scope.$on('mapInitialized', function (event, map) {
    $scope.map = map;
  });

  $scope.remedios =  {
    "filter" : false,
    "remedios": Remedios.all()
  };

  $scope.remove = function(remedio) {
    Remedios.remove(remedio);
  };

});

/**********************************
 *  MedicamentCreateCtrl
 **********************************/
app.controller('MedicamentCreateCtrl', function($scope,
                                                $state,
                                                $cordovaCamera,
                                                $ionicActionSheet,
                                                $timeout) {

  $scope.addMedicament = function (form) {

    console.log("MedicamentCreateCtrl::addMedicament");

    if(form.$valid) {

    } else {
      console.log("Invalid form");
    }
  };

  $scope.addPicture = function () {
    console.log("Let's add a picture!");

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Tirar uma foto' },
        { text: 'Escolher da galeria' }
      ],
      destructiveText: 'Remover',
      titleText: 'O que deseja fazer?',
      cancelText: 'Cancelar',
      cancel: function() {
        // nothing to do.
      },
      buttonClicked: function(index) {
        console.log(index);
        if (index == 0) {
          $scope.doGetFromCamera();
        } else if (index == 1) {
          $scope.doGetFromGallery();
        }
        return true;
      },
      destructiveButtonClicked:  function() {
        console.log("Remover imagem do remédio");
      }
    });

    $timeout(function() {
      hideSheet();
    }, 2000);

  };

  $scope.doGetFromGallery = function () {
    console.log("Let's add a picture from GALLERY!");
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

  $scope.doGetFromCamera = function () {
    console.log("Let's add a picture from CAMERA!");
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA, // CAMERA
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
