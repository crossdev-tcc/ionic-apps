angular.module('minifarma.services', [
    'minifarma.services.medicamentService'
])

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

    self.remove = function(alert) {
      var parameters = [alert.id];
      return DB.query('DELETE FROM Alert WHERE id = (?)', parameters).then(function (result) {
            console.log("Deleted alert" + result);
          },
          function (err) {
            console.log("Error deleting alert " + err);
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
