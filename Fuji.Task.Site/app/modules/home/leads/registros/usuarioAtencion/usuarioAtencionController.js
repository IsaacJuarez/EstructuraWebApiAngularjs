angular.module('Task').controller('usuarioAtencionController', ['$scope', '$rootScope', '$mdDialog', 'leadsServices', 'prospecto',
    function ($scope, $rootScope, $mdDialog, leadsServices, prospecto) {
        $scope.loading = false;
        $scope.prospecto = prospecto;
        $scope.agentes = [];
        

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        function load() {
            $scope.loading = true;
            var request = {
                token: $rootScope.Globals.CurrentUserCot.Token
            };
            leadsServices.ObtenerAgenteVentas(request, function (responseEst) {
                $scope.loading = false;
                $scope.agentes = responseEst;
            });
        }
        load();

        $scope.ActualizarUserSeguimiento = function (prospecto, ev) {
            $scope.loading = true;
            try {
                var Request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    intUserID: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                    prospecto: prospecto
                };
                leadsServices.ActualizarUserSeguimiento(Request, function (response) {
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
            catch (Exce) {
                console.log("Error en ActualizarUserSeguimiento: " + Exce.Message);
                $scope.loading = false;
            }
        };

    }]);
