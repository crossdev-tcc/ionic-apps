var app = angular.module('minifarma.controllers.medicament', []);

/**********************************
 *  MedicamentListCtrl
 **********************************/
app.controller('MedicamentListCtrl', function($scope, Medicament) {

  console.log("MedicamentListCtrl");

  $scope.isAndroid = ionic.Platform.isAndroid();


  Medicament.all().then(function(remediosResult){
    $scope.remedios =  {
      "filter" : 0,
      "remedios": remediosResult
    };
  });

  $scope.remove = function(remedio) {
    Medicament.remove(remedio);
  };
});

app.factory('Category', function() {

  category = {};
  category.name = '';
  return category;
});

/**********************************
 *  MedicamentCreateCtrl
 **********************************/
app.controller('MedicamentCategoryListCtrl', function($scope,
                                                      $ionicHistory,
                                                      Category) {
  $scope.selectedCategory =  Category;
  $scope.shouldShowDelete = false;

  $scope.categories = [
    {
      name: "Antidrepessivos"
    },
    {
      name: "Dor de cabeça"
    },
    {
      name: "Dor muscular"
    },
    {
      name: "Hipertensão"
    }
  ];

  $scope.select = function(categoryName) {
    $scope.selectedCategory.name = categoryName;
    $ionicHistory.goBack();
  };

});

app.controller('MedicamentCreateCtrl', function($scope,
                                                $state,
                                                $cordovaCamera,
                                                $ionicActionSheet,
                                                $cordovaSQLite,
                                                Medicament,
                                                Category) {
  console.log("MedicamentCreateCtrl");

  $scope.category =  Category;

  $scope.groups = [];
  $scope.groups[0] = {
    name: "Quantidade"
  };
  $scope.groups[1] = {
    name: "Dose"
  };
  $scope.groups[2] = {
    name: "Place"
  };

  $scope.shownGroup = null;

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  $scope.addMedicament = function (form) {

    console.log("MedicamentCreateCtrl::addMedicament");

    console.log(form.doseType);

    if(form.$valid) {
      console.log(form.name.$viewValue);
      Medicament.insert(form.name.$viewValue);
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

  // DATABASE FUNCTIONS

  $scope.insert = function(medicamentName) {

    $cordovaSQLite.execute(db, 'INSERT INTO Medicament (name, expired) VALUES (?, 1)', [medicamentName])
      .then(function(result) {
        console.log("Message inserted successful, cheers!");
        console.log('resultSet.insertId: ' + result.insertId);
      }, function(error) {
        console.log("Error on insert: " + error.message);
      })

  };

});
