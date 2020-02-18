angular.module('TaskMDL').controller('codigoSAPController', ['$scope', '$rootScope', '$mdDialog', '$location', 'clientesServices', 'cliente',
    function ($scope, $rootScope, $mdDialog, $location, clientesServices, cliente) {
        $scope.loading = false;
        $scope.cliente = cliente;

        $scope.Documentos = [];

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };


        function load() {
            $scope.loading = true;
            try {
                $scope.loading = false;
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Existe un error: " + Exce.Message);
            }
        }
        load();

        $scope.ModificarCodigoSAP = function (cliente, ev) {
            $scope.loading = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Cliente: cliente,
                    UserId: $rootScope.Globals.CurrentUserCot.intUsuarioID
                };
                clientesServices.ModificarCodigoSAP(request, function (response) {
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