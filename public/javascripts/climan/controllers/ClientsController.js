(function() {

  angular.module('climan').controller('ClientsController', ['$scope', '$state', 'ClientsEngineService',
    function($scope, $state, ClientsEngine) {

    $scope.status = '';

    $scope.search = function(cpf) {

      if (!cpf || (cpf && cpf.length < 11)) {
        return;
      }

      if (!ClientsEngine.validateCPF(cpf)) {
        $scope.status = 'invalid';
      }
      else {
        $scope.status = 'valid';
        // search on db
      }
      
    };

  }]);
})();
