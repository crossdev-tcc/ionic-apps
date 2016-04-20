angular.module('starter.services', [])

.factory('Remedios', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var remedios = [{
    id: 0,
    name: 'Novalgina',
    expirationDate: '12/12/2012',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Maracujina',
    expirationDate: '12/12/2012',
    face: 'img/ben.png'
  }, {
    id: 2,
    name: 'Tylenol',
    expirationDate: '12/12/2012',
    face: 'img/ben.png'
  }, {
    id: 3,
    name: 'Arnica',
    expirationDate: '12/12/2012',
    face: 'img/ben.png'
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
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Maracujina',
    nextDate: '12/12/2012 21:00',
    face: 'img/ben.png'
  }, {
    id: 2,
    name: 'Tylenol',
    nextDate: '12/12/2012 21:00',
    face: 'img/ben.png'
  }, {
    id: 3,
    name: 'Arnica',
    nextDate: '12/12/2012 21:00',
    face: 'img/ben.png'
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
// .factory('Chats', function() {
//   // Might use a resource here that returns a JSON array
//
//   // Some fake testing data
//   var chats = [{
//     id: 0,
//     name: 'Ben Sparrow',
//     lastText: 'You on your way?',
//     face: 'img/ben.png'
//   }, {
//     id: 1,
//     name: 'Max Lynx',
//     lastText: 'Hey, it\'s me',
//     face: 'img/max.png'
//   }, {
//     id: 2,
//     name: 'Adam Bradleyson',
//     lastText: 'I should buy a boat',
//     face: 'img/adam.jpg'
//   }, {
//     id: 3,
//     name: 'Perry Governor',
//     lastText: 'Look at my mukluks!',
//     face: 'img/perry.png'
//   }, {
//     id: 4,
//     name: 'Mike Harrington',
//     lastText: 'This is wicked good ice cream.',
//     face: 'img/mike.png'
//   }];
//
//   return {
//     all: function() {
//       return chats;
//     },
//     remove: function(chat) {
//       chats.splice(chats.indexOf(chat), 1);
//     },
//     get: function(chatId) {
//       for (var i = 0; i < chats.length; i++) {
//         if (chats[i].id === parseInt(chatId)) {
//           return chats[i];
//         }
//       }
//       return null;
//     }
//   };
// });
