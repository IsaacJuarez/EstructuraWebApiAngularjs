angular.module('login').controller('loginController', ['$scope', '$rootScope', '$mdDialog', '$cookieStore', '$location', 'loginServices', '$cookies',
    function ($scope, $rootScope, $mdDialog, $cookieStore, $location, loginServices, $cookies) {
        $scope.Reporte = false;

        $scope.loading = false;
        $scope.reporte = false;
        var clearGlobals = function () {
            $rootScope.Globals = {};
            $cookieStore.remove('Globals');
            $scope.loading = false;
            $rootScope.logeado = false;
        };
        var setGlobals = function (data) {
            $rootScope.Globals = {
                CurrentUserCot: data
            };
            $cookieStore.put('Globals', $rootScope.Globals);
        };
        clearGlobals();
        $scope.Ingresar = function (data, event) {
            $scope.loading = true;
            //loginServices.Ingresar(data, function (response) {
            //    $scope.loading = false;
            //    if (response.Success) {
            var currentUserCot = {
                intUsuarioID: 1,
                Token: 'Token',
                vchUsuario: 'Master of puppets',
                vchNombre: 'Master',
                intTipoUsuarioID: 1,
                vchTipoUsuario: 'El Master',
                Permiso: [{
                    bitActivo: 1,
                    intAccesoID: 1,
                    vchAcceso: 'A',
                    vchClave: '1',
                    bitAcceso: true
                }]
            };
            setGlobals(currentUserCot);
                    $rootScope.logeado = true;
                    if ($rootScope.path !== undefined) {
                        $location.path($rootScope.path);
                        $rootScope.path = {};
                    }
                    else
                        $location.path('/');
            //    }
            //    else {
            //        $mdDialog.show(
            //            $mdDialog.alert()
            //                .clickOutsideToClose(false)
            //                .title('Mensaje del sistema')
            //                .textContent(response.Message)
            //                .ariaLabel('mensaje de login')
            //                .ok('Aceptar')
            //                .targetEvent(event)
            //        );
            //    }
            //    $scope.loading = false;
            //});
        };
        $scope.RecuperarCredenciales = function (ev) {
            $location.path('/login/enviar-credenciales');
        };

        function traduce(palabra) {
            return $translate.instant(palabra);
        }

    }]);