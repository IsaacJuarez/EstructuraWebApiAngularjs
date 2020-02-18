angular.module('Task').controller('estadisticasLeadsController', ['$scope', '$rootScope', '$mdDialog', '$location', 'estadisticasLeadsServices',
    function ($scope, $rootScope, $mdDialog, $location, estadisticasLeadsServices) {
        $scope.user = $rootScope.Globals.CurrentUserCot;
        $scope.loading = false;
        $scope.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
        $scope.evento = {
            intEventoID: 0,
            vchNombre:'Todos'
        };

        $scope.user = {
            intUsuarioID: 0,
            vchNombre: 'Todos'
        };

        function load() {
            $scope.loading = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token
                };
                estadisticasLeadsServices.ObtenerEventos(request, function (responseEventos) {
                    estadisticasLeadsServices.ObtenerUsuariosEventos(request, function (responseUsers) {
                        $scope.loading = false;
                        $scope.eventos = [{ intEventoID: 0, vchNombre: 'Todos' }];
                        for (i = 0; i < responseEventos.length; i++)
                            $scope.eventos.push(responseEventos[i]);
                        $scope.usuarios = [{ intUsuarioID: 0, vchNombre: 'Todos' }];
                        for (i = 0; i < responseUsers.length; i++)
                            $scope.usuarios.push(responseUsers[i]);
                    });
                });
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Existe un error: " + Exce.Message);
            }
        }
        load();


        $scope.EditarUsuario = function (ev) {
            $mdDialog.show({
                controller: 'editarUsuarioController',
                templateUrl: 'app/modules/home/user/update/editarUsuarioView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                skipHide: true
            }).then(function (response) {
                var alert = $mdDialog.alert({
                    title: 'Mensaje del sistema',
                    textContent: response.Message,
                    ok: 'Aceptar',
                    skipHide: true
                });
                $mdDialog.show(alert);
            });
        };

        $scope.MenuEventos = function (ev) {
            $mdDialog.show({
                controller: 'menuEventosController',
                templateUrl: 'app/modules/home/leads/menuEventos/menuEventosView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                skipHide: true
            });
        };
        $scope.AccesoDirectoNC = function (ev) {
            $location.path('/cotizacion/add');
        };

        $scope.AccesoDirectoAs = function (ev) {
            $location.path('/cotizacion');
        };

        $scope.AccesoDirectoSC = function (ev) {
            $location.path('/clientes/add');
        };
    }]);