angular.module('TaskMDL').controller('agregarUsuarioController', ['$scope', '$rootScope', '$mdDialog', 'usuariosServices',
    function ($scope, $rootScope, $mdDialog, usuariosServices) {
        $scope.loading = false;
        $scope.existe = false;
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.managers = [];
        $scope.perfiles = [];
        function load() {
            $scope.loading = true;
            var request = {
                id: 0,
                token: $rootScope.Globals.CurrentUserCot.Token
            };
            usuariosServices.ObtenerPerfiles(request, function (responsePerfiles) {
                usuariosServices.ObtenerTipoVenta(request, function (responseVenta) {
                    $scope.loading = false;
                    $scope.perfiles = responsePerfiles;
                    $scope.ventas = responseVenta;
                });
            });
        }
        load();

        $scope.Usuario = function () {
            $scope.loading = true;
            $scope.usuario.vchUsuario = $scope.usuario.vchEmail;
            var request = {
                Token: $rootScope.Globals.CurrentUserCot.Token,
                vchEmail: $scope.usuario.vchEmail
            };
            usuariosServices.evaluarCorreo(request, function (response) {
                $scope.loading = false;
                $scope.existe = response.exists;
                if (response.exists){
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

        $scope.AgregarUsuario = function (usuario, ev) {
            $scope.loading = true;
            var Request = {
                Usuario: usuario,
                Token: $rootScope.Globals.CurrentUserCot.Token,
                intUserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
            };
            usuariosServices.AgregarUsuario(Request, function (response) {
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