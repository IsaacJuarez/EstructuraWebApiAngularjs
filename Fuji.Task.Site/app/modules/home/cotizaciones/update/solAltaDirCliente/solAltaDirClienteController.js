angular.module('Task').controller('solAltaDirClienteController', ['$scope', '$rootScope', '$mdDialog', '$location', 'cotizacionesServices', 'cliente','CotizacionID',
    function ($scope, $rootScope, $mdDialog, $location, cotizacionesServices, cliente, CotizacionID) {
        $scope.loading = false;
        $scope.Cliente = cliente;
        $scope.CotizacionID = CotizacionID;
        $scope.Documentos = [];

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.EnviarSolAltaDirCliente = function (cliente, ev) {
            $scope.loading = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Cliente: cliente,
                    UserId: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                    intCotizacionID: CotizacionID
                };
                cotizacionesServices.EnviarSolAltaDirCliente(request, function (response) {
                    if (response.Success) {
                        $mdDialog.hide(response);
                    }
                    else {
                        var alert = $mdDialog.alert({
                            title: 'Mensaje del sistema',
                            textContent: response.Message,
                            ok: 'Aceptar',
                            skipHide: true
                        });
                        $mdDialog.show(alert);
                    }
                    $scope.loading = false;
                });
            }
            catch (Exce) {
                $scope.loading = false;
                console.log('Error : ' + Exce.Message);
            }
        };

    }]);