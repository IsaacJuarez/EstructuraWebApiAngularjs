angular.module('Task').controller('recharzarComiteController', ['$scope', '$rootScope', '$mdDialog', '$location', 'cotizacionesServices', 'cotizacion',
    function ($scope, $rootScope, $mdDialog, $location, cotizacionesServices, cotizacion) {
        $scope.cotizacion = cotizacion;

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.RechazadaComite = function (ev, cotizacion) {
            try {
                var Request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    cotizacion: cotizacion,
                    UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
                };
                cotizacionesServices.RechazadaComite(Request, function (response) {
                    $scope.loading = false;
                    if (response.Success)
                        $mdDialog.hide(response);
                    else {
                        var alert = $mdDialog.alert({
                            title: 'Advertencia',
                            textContent: response.Message,
                            ok: 'Aceptar',
                            skipHide: true
                        });
                        $mdDialog.show(alert);
                    }
                });
            }
            catch (exce) {
                console.log("Error: " + exce.message);
            }
        };
    }]);