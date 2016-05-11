var app = angular.module('minifarma.controllers.pharmacy', ['ngMap']);

/**********************************
 *  PharmacyCreateCtrl
 **********************************/
app.controller('PharmacyCreateCtrl', function($scope, $state) {

  $scope.currentPosition = {};
  $scope.marker = null;

  $scope.addPharmacy = function (form) {
    console.log("PharmacyCreateCtrl::addPharmacy");

    if(form.$valid) {

    } else {
      console.log("Invalid form");
    }
  };

  $scope.cancelCreate = function () {
    $state.go('tab.remedio');
  };

  $scope.$on('mapInitialized', function(event, map) {
      $scope.map = map;
  });

  $scope.getCurrentLocation = function() {

    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.map.setOptions({
        mapTypeId:google.maps.MapTypeId.SATELLITE,
        zoom: 15,
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: false
      });

      var lat = position.coords.latitude;
      var lon = position.coords.longitude;

      var pos = new google.maps.LatLng(lat, lon);

      $scope.map.setCenter(pos);

      $scope.marker = new google.maps.Marker({
        position: {lat: lat, lng: lon},
        map: $scope.map,
        draggable: true,
        animation: google.maps.Animation.DROP
      });

      google.maps.event.addListener($scope.marker, 'dragend', function(dragEvent){
          console.log('Lat: ' + dragEvent.latLng.lat().toFixed(6) + ' Lon: ' + dragEvent.latLng.lng().toFixed(6));
      });

      $scope.marker.setMap($scope.map);

    });
  }
});
