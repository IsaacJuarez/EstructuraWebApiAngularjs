angular.module('TaskMDL').controller('editarUsuarioController', ['$scope', '$rootScope', '$mdDialog', '$cookieStore', 'homeServices',
    function ($scope, $rootScope, $mdDialog, $cookieStore, homeServices) {
        $scope.loading = false;
        $scope.usuario = {
            intUserID: $rootScope.Globals.CurrentUserCot.intUsuarioID,
            vchUsuario: $rootScope.Globals.CurrentUserCot.vchUsuario,
            vchPassword: '',
            vchNombre: $rootScope.Globals.CurrentUserCot.vchNombre,
            vchEmail: $rootScope.Globals.CurrentUserCot.vchEmail,
            Confirmacion: '',
            vchPuesto: $rootScope.Globals.CurrentUserCot.vchPuesto,
            vchCelular: $rootScope.Globals.CurrentUserCot.vchCelular,
            vchExt: $rootScope.Globals.CurrentUserCot.vchExt,
            vchTipoUsuario: $rootScope.Globals.CurrentUserCot.vchExt,
            vchTipoVenta: $rootScope.Globals.CurrentUserCot.vchTipoVenta
        };
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.EditarUsuario = function (usuario, ev) {
            $scope.loading = true;
            var Request = {
                intUserID: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                token: $rootScope.Globals.CurrentUserCot.Token,
                Usuario: usuario
            };
            homeServices.EditarUsuario(Request, function (response) {
                $scope.loading = false;
                if (response.Success) {
                    $cookieStore.remove('Globals');
                    setGlobals(response.CurrentUserCot);
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
            });
        };

        var setGlobals = function (data) {
            $rootScope.Globals = {
                CurrentUserCot: data
            };
            $cookieStore.put('Globals', $rootScope.Globals);
        };
    }]);