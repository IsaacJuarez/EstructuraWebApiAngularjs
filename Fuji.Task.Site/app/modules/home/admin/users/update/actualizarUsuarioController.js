angular.module('TaskMDL').controller('actualizarUsuarioController', ['$scope', '$rootScope', '$mdDialog', 'usuariosServices', 'usuario',
    function ($scope, $rootScope, $mdDialog, usuariosServices, usuario) {
        $scope.loading = false;
        $scope.usuario = angular.copy(usuario);
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
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

        $scope.ActualizarUsuario = function (usuario, ev) {
            $scope.loading = true;
            var Request = {
                Usuario: usuario,
                Token: $rootScope.Globals.CurrentUserCot.Token,
                intUserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
            };
            usuariosServices.ActualizarUsuario(Request, function (response) {
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

        $scope.querySearch = function (query) {
            return query ? $scope.managers.filter(createFilterFor(query)) : $scope.managers;
        };
    }]);