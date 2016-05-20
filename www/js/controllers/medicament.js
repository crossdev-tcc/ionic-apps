var app = angular.module('minifarma.controllers.medicament', []);

/**********************************
 *  Factories
 **********************************/

app.factory('Medicament', function() {
  var medicament = {};
  medicament.expirationDate = null;
  return medicament;
});

app.factory('Category', function() {
  var category = {};
  category.name = '';
  return category;
});

/**********************************
 *  MedicamentListCtrl
 **********************************/
app.controller('MedicamentListCtrl', function($scope, MedicamentService) {

  console.log("MedicamentListCtrl");

  $scope.isAndroid = ionic.Platform.isAndroid();

  MedicamentService.all().then(function(remediosResult){
    //$scope.remedios =  {
    //  "filter" : 0,
    //  "remedios": remediosResult
    //};

    //Medicament.all().then(function(remediosResult){
    $scope.remedios = remediosResult
  });

  $scope.remove = function(remedio) {
    MedicamentService.remove(remedio);
  };

  $scope.filterValue = 0;
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
                                                MedicamentService,
                                                Medicament,
                                                Category,
                                                ionicDatePicker) {
  console.log("MedicamentCreateCtrl");

  $scope.medicament = Medicament;
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

    if(form.$valid) {
      console.log(form.name.$viewValue);
      MedicamentService.insert(form.name.$viewValue);
      $state.go('tab.remedio');
    } else {
      console.log("Invalid form");
    }
  };


  /**  DATE PICKER */
  var dateSelecter = {
    callback: function (val) {
      $scope.medicament.expirationDate = new Date(val);
      console.log('Return value from the datepicker popup is : ' + $scope.medicament.expirationDate );
    }
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(dateSelecter);
  };


  /** MEDICAMENT PICTURE */
  $scope.addMedicamentPicture = function () {
    $scope.pictureType = "medicament";
    $scope.addPicture();
  };

  /** PRESCRIPTION PICTURE */
  $scope.addPrescriptionPicture = function () {
    $scope.pictureType = "prescription";
    $scope.addPicture();
  };

  /** ADD A PICTURE */
  $scope.addPicture = function () {
    console.log("Let's add a picture!");

    var buttons = [];
    if($scope.pictureType == "prescription" && $scope.prescriptionPicture != null) {
      buttons = [
        { text: 'Tirar uma foto' },
        { text: 'Escolher da galeria' },
        { text: 'Visualizar foto' }
      ]
    } else {
      buttons = [
        { text: 'Tirar uma foto' },
        { text: 'Escolher da galeria' }
      ]
    }

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: buttons,
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
        } else if (index == 2) {
          //Show picture
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
      if ($scope.pictureType == "medicament") {
        $scope.picture = imageData;
      } else {
        $scope.prescriptionPicture = imageData;
      }
    }, function (err) {
      console.error(err);
      $ionicPopup.alert({
        title:'Erro ao obter imagem',
        subTitle: 'Ocorreu um erro ao obter a imagem, por favor tente novamente.'
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
      if ($scope.pictureType == "medicament") {
        $scope.picture = imageData;
      } else {
        $scope.prescriptionPicture = imageData;
      }
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
