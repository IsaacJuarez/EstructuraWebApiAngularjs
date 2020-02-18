angular.module('Task').controller('menuEventosController', ['$scope', '$rootScope', '$mdDialog', '$location', 'eventosServices', '$cookieStore',
    function ($scope, $rootScope, $mdDialog, $location, eventosServices, $cookieStore) {
        $scope.loading = false;
        $scope.existe = false;
        $scope.eventos = [];
        $scope.busqueda = {
            vchNombre: '',
            intLineaProdID: 0
        };

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        function load() {
            $scope.loading = true;
            var request = {
                token: $rootScope.Globals.CurrentUserCot.Token,
                id: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                Busqueda: $scope.busqueda,
                intLineaProdID: $scope.busqueda.intLineaProdID
            };
            eventosServices.ObtenerEventos(request, function (response) {
                $scope.loading = false;
                for (i = 0; i < response.length; i++)
                    if (response[i].bitActive)
                        $scope.eventos.push(response[i]);
            });
        }
        load();

        $scope.IngresarEvento = function (evento, ev) {
            var response = '';
            $rootScope.evento = evento;
            $cookieStore.put('evento', evento);
            $location.path('/leads/registro');
            $mdDialog.hide(response);
        };

    }]);
