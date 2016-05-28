var app = angular.module('minifarma.services.pharmacyService', [])

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
  });
