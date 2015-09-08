(function() {

  var app = angular.module('climan', ['ui.mask', 'ui-notification', 'ui.router']);

  app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function($httpProvider, $stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('clients', {
      url: '/clients',
      templateUrl: '/states/clients.jade'
    });

    // unknown states go to home
    $urlRouterProvider.otherwise('/clients');

  }]);

})();
