angular.module('minifarma.services', [])

  .factory('DB', function ($q,
                           $cordovaSQLite,
                           $ionicPlatform,
                           DB_CONFIG) {

    var self = this;
    self.db = null;

    self.init = function () {
      if (window.cordova) {
        self.db = $cordovaSQLite.openDB({name: DB_CONFIG.name, location: 'default'});
      } else {
        // console.log('websql');
        self.db = window.openDatabase(DB_CONFIG.name, "1.0", "MiniFarma", -1);
      }

      angular.forEach(DB_CONFIG.tables, function(table) {
        var columns = [];

        angular.forEach(table.columns, function(column) {
          columns.push(column.name + ' ' + column.type);
        });

        var foreigners = [];
        angular.forEach(table.foreign, function(foreign) {
          foreigners.push('FOREIGN KEY(' + foreign.key + ') REFERENCES ' + foreign.references);
        });

        var query;
        if (foreigners.length > 0){
          query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ', ' + foreigners.join(',') + ')';
        } else {
          query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
        }
        // console.log(query);
        self.query(query);
        // console.log('Table ' + table.name + ' initialized');
      });
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

  .factory('AlertService', function(DB) {
    var self = this;

    self.all = function () {
      return DB.query('SELECT * FROM Alert')
        .then(function (result) {
          return DB.fetchAll(result);
      });
    };

    self.insert = function(alert) {
      var parameters = [
        alert.startDateTime,
        alert.durationUnity,
        alert.durationNumber,
        alert.active,
        alert.id_interval,
        alert.id_medicament];

      return DB.query('INSERT INTO Alert (startDate, duration_unit, duration_number, active, id_interval, id_medicament) VALUES (?,?,?,?,?,?)', parameters);
    };

    return self;
  })

  .factory('MedicamentService', function (DB) {

    var self = this;

    self.all = function () {
      return DB.query('SELECT * FROM Medicament')
        .then(function (result) {
          return DB.fetchAll(result);
      });
    };

    self.getById = function (id) {
      if (id == 0) {
        id = 1;
      }
      return DB.query('SELECT * FROM Medicament WHERE id = ?', [id])
        .then(function (result) {
          return DB.fetch(result);
        });
    };

    self.insert = function(medicament) {
      var parameters = [medicament.name,
        medicament.expiration_date,
        medicament.quantity,
        medicament.unit,
        medicament.price,
        medicament.dose,
        medicament.picture_medicament,
        medicament.picture_prescription,
        medicament.expired,
        medicament.id_pharmacy,
        medicament.id_category,
        medicament.id_place,
        medicament.id_interval,
        medicament.notes];
      return DB.query('INSERT INTO Medicament (name, expiration_date, quantity, unit, price, dose, picture_medicament, picture_prescription, expired, id_pharmacy, id_category, id_place, id_interval, notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', parameters);
      //INSERT INTO Medicament (name, expiration_date, quantity, unit, price, dose, picture_medicament, picture_prescription, expired, id_pharmacy, id_category, id_place, id_interval, notes) VALUES (?,?,?,?,?,?,?,?,1,?,?,?,?,?)'
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
  })

  .factory('PharmacyService', function (DB) {

    var self = this;

    self.all = function () {
      return DB.query('SELECT * FROM Pharmacy')
        .then(function (result) {
          return DB.fetchAll(result);
        });
    };

    self.getById = function (id) {
      return DB.query('SELECT * FROM Pharmacy WHERE id = ?', [id])
        .then(function (result) {
          return DB.fetch(result);
        });
    };

    self.insert = function(pharmacy) {
      var parameters = [pharmacy.name, pharmacy.favorite, pharmacy.lat, pharmacy.lon, pharmacy.phone];
      return DB.query('INSERT INTO Pharmacy (name, favorite, latitude, longitude, phone) VALUES (?,?,?,?,?)', parameters);
    };

    self.remove = function(medicament) {
      var parameters = [medicament.id];
      return DB.query('DELETE FROM Pharmacy WHERE id = (?)', parameters)
        .then(function (result) {
            console.log("Deleted pharmacy" + result);
          },
          function (err) {
            console.log("Error deleting pharmacy " + err);
          });
    };

    return self;
  })

  .factory('IntervalService', function () {
    var self = this;

    self.intervals = {
      1 : [1, '1 hora'],
      2 : [2, '2 horas'],
      3 : [3, '3 horas'],
      4 : [4, '4 horas'],
      5 : [6, '6 horas'],
      6 : [8, '8 horas'],
      7 : [12, '12 horas'],
      8 : [24, '24 horas']
    };

    return self
  });
