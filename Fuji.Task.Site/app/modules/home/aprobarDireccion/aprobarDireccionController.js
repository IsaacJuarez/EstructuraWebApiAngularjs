angular.module('TaskMDL').controller('aprobarDireccionController', ['$scope', '$rootScope', '$mdDialog', 'homeServices','aviso',
    function ($scope, $rootScope, $mdDialog, homeServices, aviso) {
        $scope.loading = false;
        $scope.aviso = aviso;
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        function load() {
            try {
                $scope.loading = true;
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    aviso: $scope.aviso
                };
                homeServices.ObtenerDetalleAutorizacionDir(request, function (response) {
                    if (response.Success)
                        $scope.dir = response.Direccion;
                    $scope.loading = false;
                });
            }
            catch (Exce) {
                console.log("Error al cargar la autorizacion de dirección: " + Exce.Message);
                $scope.loading = false;
            }
        }
        load();


        $scope.AutorizarDireccion = function (dir, ev, bitAut) {
            $scope.loading = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    intUsuarioAut: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                    bitAutorizada: false,
                    intDireccionID: dir.intDireccionID,
                    intCotizacionID: dir.intCotizacionID
                };
                if (bitAut == 1) {//Autorizar
                    request.bitAutorizada = true;
                }
                homeServices.AutorizarDireccion(request, function (response) {
                    if (response.Success) {
                        $mdDialog.hide(response);
                    }
                    else {
                        var alert = $mdDialog.alert({
                            title: 'Advertencia',
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
                console.log("Error al autorizar Dirección: " + Exce.Message);
            }
        };
    }]);