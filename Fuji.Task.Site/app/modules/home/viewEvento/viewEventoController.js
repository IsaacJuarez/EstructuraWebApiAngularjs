angular.module('TaskMDL').controller('viewEventoController', ['$scope', '$rootScope', '$mdDialog', 'homeServices', 'evento',
    function ($scope, $rootScope, $mdDialog, homeServices, evento) {
        $scope.loading = false;
        $scope.evento = evento;

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }]);