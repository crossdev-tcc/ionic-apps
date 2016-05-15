angular.module('minifarma.services', [])

  .factory('Alertas', function () {

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
      all: function () {
        return alertas;
      },
      remove: function (alerta) {
        alertas.splice(alertas.indexOf(alerta), 1);
      },
      get: function (remedioId) {
        for (var i = 0; i < alertas.length; i++) {
          if (alertas[i].id === parseInt(alertaId)) {
            return alertas[i];
          }
        }
        return null;
      }
    };
  })

  .factory('DB', function ($q, $cordovaSQLite, $ionicPlatform) {

    var self = this;
    self.db = null;

    self.init = function () {
      if (window.cordova) {
        self.db = $cordovaSQLite.openDB({name: 'my.db', location: 'default'});
      } else {
        console.log('websql');
        self.db = window.openDatabase("my.db", "1.0", "MiniFarma", -1);
      }
      var query = 'CREATE TABLE IF NOT EXISTS Medicament (id integer primary key, name text, expired int)';
      self.query(query);
    };

    self.query = function (query, bindings) {
      bindings = typeof bindings !== 'undefined' ? bindings : [];
      var deferred = $q.defer();

      $ionicPlatform.ready(function () {
        self.db.transaction(function (transaction) {
          transaction.executeSql(query, bindings, function (transaction, result) {
            deferred.resolve(result);
          }, function (transaction, error) {
            deferred.reject(error);
          });
        });
      });

      return deferred.promise;
    };

    self.fetchAll = function (result) {
      var output = [];
      for (var i = 0; i < result.rows.length; i++) {
        output.push(result.rows.item(i));
      }
      return output;
    };

    self.fetch = function (result) {
      return result.rows.item(0);
    };
    return self;
  })

  .factory('Medicament', function (DB, $cordovaSQLite) {
    var self = this;

    self.all = function () {
      return DB.query('SELECT * FROM Medicament')
        .then(function (result) {
          return DB.fetchAll(result);
      });
    };

    self.getById = function (id) {
      return DB.query('SELECT * FROM Medicament WHERE id = ?', [id])
        .then(function (result) {
          return DB.fetch(result);
        });
    };

    self.insert = function(medicamentName) {
      var parameters = [medicamentName, 0];
      return DB.query('INSERT INTO Medicament (name, expired) VALUES (?, ?)', parameters);
    };

    self.update = function(id, medicament) {
      var parameters = [medicament.name, medicament.expired, medicament.id];
      return DB.query('UPDATE Medicament set name = (?), expired = (?) WHERE id = (?)', parameters);
    };

    self.remove = function(medicament) {
      var parameters = [medicament.id];
      return DB.query('DELETE FROM Medicament WHERE id = (?)', parameters)
        .then(function (result) {
          console.log("Deleted medicament" + result);
        },
        function (err) {
          console.log("Error deleting medicament " + err);
        });
    };

    return self;
  }); 
