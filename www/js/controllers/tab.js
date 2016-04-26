angular.module('minifarma.controllers.tab', [])

  .controller('TabCtrl', function($scope,
                                  $state,
                                  $ionicActionSheet,
                                  $timeout) {

    $scope.showAction = function() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'Remédio' },
          { text: 'Alerta' },
          { text: 'Farmácia' }
        ],
        titleText: 'Adicionar novo',
        cancelText: 'Cancelar',
        cancel: function() {
          // Nothing to do.
        },
        buttonClicked: function(index) {

          switch(index) {
            case 0:
              $scope.createMedicament();
              break;
            case 1:
              $scope.createAlert();
              break;
            case 2:
              break;
          }
          return true;
        }
      });

      $timeout(function() {
        hideSheet();
      }, 5000);

    };

    $scope.createMedicament = function() {
      $state.go('createMedicament');
    };

    $scope.createAlert = function() {
      $state.go('createAlert');
    };

  });
