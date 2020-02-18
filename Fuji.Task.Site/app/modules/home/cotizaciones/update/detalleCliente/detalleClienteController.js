angular.module('Task').controller('detalleClienteController', ['$scope', '$rootScope', '$mdDialog', 'cotizacionesServices', 'Detalle',
    function ($scope, $rootScope, $mdDialog, cotizacionesServices, Detalle) {
        $scope.loading = false;
        $scope.Detalle = Detalle;

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.file = {
            location: ''
        };

        function load() {
            $scope.loading = true;
            $scope.file.location = location.origin + '/Repository/Documentos/AltaCliente/Alta Cliente_' + $scope.Detalle.intClienteID + ".pdf";
            $scope.loading = false;
        }
        load();

    }]);