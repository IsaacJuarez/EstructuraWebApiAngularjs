angular.module('Task').controller('detailClientController', ['$scope', '$rootScope', '$mdDialog', 'cotizacionesServices', 'cliente',
    function ($scope, $rootScope, $mdDialog, cotizacionesServices, cliente) {
        $scope.loading = false;
        $scope.cliente = cliente;

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        function load() {
            $scope.loading = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Cliente: $scope.cliente
                };
                cotizacionesServices.ObtenerDetalleCliente(request, function (response) {
                    if (response.Success) {
                        $scope.cliente = response.cliente;
                    }
                    $scope.loading = false;
                });
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Existe un error: " + Exce.Message);
            }
        }
        load();
    }]);