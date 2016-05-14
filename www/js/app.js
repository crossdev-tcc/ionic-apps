var app = angular.module('minifarma', [
  'ionic',
  'ngMessages',
  'ngCordova',
  'ngMap',
  'minifarma.controllers',
  'minifarma.services'
]);

var db;

app.run(function($ionicPlatform, $cordovaSQLite) {
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

    db = $cordovaSQLite.openDB({name: 'my.db', location: 'default'});
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Medicament (id integer primary key, name text)");

  });
})

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true, //can't navigate to
    controller: 'TabCtrl',
    templateUrl: function() {
      if (ionic.Platform.isAndroid()) {
        return  "templates/tabs-android.html";
      }
      return "templates/tabs.html";
    }
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
        controller: 'AlertListCtrl'
      }
    }
  })

  .state('createMedicament', {
    url: "/createMedicament",
    cache: false,
    controller: 'MedicamentCreateCtrl',
    templateUrl: "templates/createMedicament.html"
  })

  .state('categoryList', {
    url: "/categoryList",
    cache: false,
    controller: 'MedicamentCategoryListCtrl',
    templateUrl: "templates/categoryList.html"
  })

  .state('createAlert', {
    url: "/createAlert",
    cache: false,
    controller: 'AlertCreateCtrl',
    templateUrl: "templates/createAlert.html"
  })

  .state('createPharmacy', {
    url: "/createPharmacy",
    cache: false,
    controller: 'PharmacyCreateCtrl',
    templateUrl: "templates/createPharmacy.html"
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/remedios');

});
