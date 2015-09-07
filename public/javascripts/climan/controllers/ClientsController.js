(function() {

  angular.module('climan').controller('ClientsController', ['$http', '$scope', '$state', 'ClientsEngineService',
    function($http, $scope, $state, ClientsEngine) {

    $scope.search = function(cpf) {

      if (!cpf || (cpf && cpf.length < 11)) {
        return;
      }

      if (!ClientsEngine.validateCPF(cpf)) {
        $scope.cpfStatus = 'invalid';
      }
      else {
        $scope.cpfStatus = 'valid';
        // search on db
      }

    };

    $scope.save = function() {
      $scope.client.cpf = $scope.cpf;

      if (ClientsEngine.validate($scope.client)) {
        $http.post('/api/clients', { client : $scope.client } ).then(function(response) {
          // notify success
          return;
        });
      }
    };

    $scope.delete = function() {
      if (ClientsEngine.validate($scope.client)) {
        // remove from db
      }

      $scope.cpfStatus = '';

      $scope.cpf = '';
      $scope.clients = [];

      $scope.client = {};
      $scope.client.email = '';
      $scope.client.marital = 'single';
      $scope.client.phones = [ '' ];
    };

    $scope.addPhoneNumber = function() {
      $scope.client.phones.push('');
    };

    $scope.popPhoneNumber = function() {
      $scope.client.phones.pop();
    };

    $scope.strCPF = function(cpf) {
      if (cpf) {
        return cpf.substring(0,3) + '.' + cpf.substring(3,6) + '.' + cpf.substring(6,9) + '-' + cpf.substring(9,11);
      }
      return '';
    }

    $scope.delete();

  }]);
})();
