(function() {

  angular.module('climan').controller('ClientsController', ['$http', '$scope', '$state', 'ClientsEngineService', 'Notification',
    function($http, $scope, $state, ClientsEngine, Notification) {

    $scope.search = function(cpf) {

      if (!cpf || cpf === '') {
        $scope.cpfStatus = 'invalid';
        return;
      }

      if (!ClientsEngine.validateCPF(cpf)) {
        $scope.cpfStatus = 'invalid';
        Notification.error({ message: 'CPF invalid' });
        return;
      }

      else if (ClientsEngine.validateCPF(cpf)) {
        $scope.cpfStatus = 'valid';

        $http.get('/api/clients/' + cpf)
          .then(function (response) {
            if (response.data) {
              $scope.client = response.data;
              $scope.client.address = response.data.address[0];
              Notification.success({ message: 'Client loaded', delay: 2500 });
            }
            else {
              Notification.error({ message: 'No Clients were found: server response mismatch', delay: 2500 });
            }
          }, function (response) {
            Notification.error({ message: 'No Clients were found', delay: 2500 });
          });
      }

    };

    $scope.save = function() {
      $scope.client.cpf = $scope.cpf;

      if (ClientsEngine.validate($scope.client)) {
        $http.post('/api/clients', { client : $scope.client } )
          .then(function(response) {
            Notification.success({ message: 'Client saved', delay: 2500 });
            return;
          }, function (response) {
            Notification.error({ message: 'Client not saved', delay: 2500 });
          });
      }
    };

    $scope.clear = function() {
      $scope.cpfStatus = '';

      $scope.cpf = '';
      $scope.clients = [];

      $scope.client = {};
      $scope.client.email = '';
      $scope.client.marital = 'single';
      $scope.client.phones = [ '' ];
    };

    $scope.delete = function() {
      if (ClientsEngine.validateCPF($scope.cpf)) {
        $http.delete('/api/clients/' + $scope.cpf)
          .then(function(response) {
            $scope.clear();
            if (response.status === 204) {
              Notification.success({ message: 'Client deleted', delay: 2500 });
            }
          }, function (response) {
            Notification.error({ message: 'Client not deleted', delay: 2500 });
          });
      }
    };

    $scope.addPhoneNumber = function() {
      $scope.client.phones.push('');
    };

    $scope.popPhoneNumber = function() {
      $scope.client.phones.pop();
    };

    $scope.clear();

  }]);
})();
