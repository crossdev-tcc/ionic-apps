var app = angular.module('minifarma.database', []);

app.constant('DB_CONFIG', {
    name: 'my.db',
    tables: [
      {
        name: 'Medicament',
        columns: [
          {name: 'id', type: 'integer primary key'},
          {name: 'name', type: 'text'},
          {name: 'expired', type: 'int'}
        ]
      }
    ]
  });
