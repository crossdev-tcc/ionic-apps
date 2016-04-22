var app = angular.module('minifarma', [
  'ionic',
  'ngMessages',
  'ngCordova',
  'ngMap',
  'minifarma.controllers',
  'minifarma.controllers.medicament',
  'minifarma.services'
]);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('createMedicament', {
    url: "/createMedicament",
    cache: false,
    controller: 'MedicamentCreateCtrl',
    templateUrl: "templates/createMedicament.html"
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true, //can't navigate to
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.remedio', {
    url: '/remedios',
    views: {
      'tab-remedio': {
        templateUrl: 'templates/tabs/tab-remedio.html',
        controller: 'MedicamentListCtrl'
      }
    }
  })

  .state('tab.alerta', {
    url: '/alertas',
    views: {
      'tab-alerta': {
        templateUrl: 'templates/tabs/tab-alerta.html',
        controller: 'AlertaCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/remedios');

});
