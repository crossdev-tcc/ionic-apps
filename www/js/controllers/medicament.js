var app = angular.module('minifarma.controllers.medicament', []);

/**********************************
 *  MedicamentListCtrl
 **********************************/
app.controller('MedicamentListCtrl', function($scope, Remedios) {

  $scope.isAndroid = ionic.Platform.isAndroid();

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
                                                $timeout,
                                                $cordovaSQLite) {

  $scope.addMedicament = function (form) {

    console.log("MedicamentCreateCtrl::addMedicament");

    if(form.$valid) {
      console.log(form.name.$viewValue);
      $scope.insert(form.name.$viewValue);
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

  // $scope.insert = function (medicamentName) {
  //   $cordovaSQLite.execute('INSERT INTO Medicament VALUES (?)', [medicamentName], function (result) {
  //     console.log('resultSet.insertId: ' + result.insertId);
  //     console.log('resultSet.rowsAffected: ' + result.rowsAffected);
  //   }, function(error) {
  //     console.log('INSERT error: ' + error.message);
  //   });
  //
  // };

  $scope.insert = function(medicamentName) {

    $cordovaSQLite.execute(db, 'INSERT INTO Medicament (name) VALUES (?)', [medicamentName])
      .then(function(result) {
        console.log("Message inserted successful, cheers!");
        console.log('resultSet.insertId: ' + result.insertId);
      }, function(error) {
        console.log("Error on insert: " + error.message);
      })

  }

});
