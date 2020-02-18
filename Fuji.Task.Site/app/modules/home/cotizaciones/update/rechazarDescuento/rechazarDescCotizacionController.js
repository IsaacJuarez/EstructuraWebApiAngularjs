angular.module('Task').controller('rechazarDescCotizacionController', ['$scope', '$rootScope', '$mdDialog', '$location', 'cotizacionesServices','cotizacion',
    function ($scope, $rootScope, $mdDialog, $location, cotizacionesServices, cotizacion) {
        $scope.cotizacion = cotizacion;

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.RechazarCotizacionDesc = function (cotizacion) {
            var Request = {
                token: $rootScope.Globals.CurrentUserCot.Token,
                cotizacion: cotizacion,
                UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
            };
            cotizacionesServices.RechazarCotizacionDesc(Request, function (response) {
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
        };
    }]);