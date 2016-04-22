angular.module('minifarma.services', [])

.factory('Remedios', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var remedios = [{
    id: 0,
    name: 'Novalgina',
    expirationDate: '12/12/2012',
    face: 'img/ionic.png'
  }, {
    id: 1,
    name: 'Maracujina',
    expirationDate: '12/12/2012',
    face: 'img/ionic.png'
  }, {
    id: 2,
    name: 'Tylenol',
    expirationDate: '12/12/2012',
    face: 'img/ionic.png'
  }, {
    id: 3,
    name: 'Arnica',
    expirationDate: '12/12/2012',
    face: 'img/ionic.png'
  }];

  return {
    all: function() {
      return remedios;
    },
    remove: function(remedio) {
      remedios.splice(remedios.indexOf(remedio), 1);
    },
    get: function(remedioId) {
      for (var i = 0; i < remedios.length; i++) {
        if (remedios[i].id === parseInt(remedioId)) {
          return remedios[i];
        }
      }
      return null;
    }
  };
})

.factory('Alertas', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var alertas = [
  {
    id: 0,
    name: 'Novalgina',
    nextDate: '12/12/2012 21:00',
    face: 'img/ionic.png',
    active: true
  }, {
    id: 1,
    name: 'Maracujina',
    nextDate: '12/12/2012 21:00',
    face: 'img/ionic.png',
    active: false
  }, {
    id: 2,
    name: 'Tylenol',
    nextDate: '12/12/2012 21:00',
    face: 'img/ionic.png',
    active: false
  }, {
    id: 3,
    name: 'Arnica',
    nextDate: '12/12/2012 21:00',
    face: 'img/ionic.png',
    active: false
  }];

  return {
    all: function() {
      return alertas;
    },
    remove: function(alerta) {
      alertas.splice(alertas.indexOf(alerta), 1);
    },
    get: function(remedioId) {
      for (var i = 0; i < alertas.length; i++) {
        if (alertas[i].id === parseInt(alertaId)) {
          return alertas[i];
        }
      }
      return null;
    }
  };
});
