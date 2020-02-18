angular.module('Task').controller('vistaEventoController', ['$scope', '$rootScope', '$mdDialog', '$mdSidenav', '$location', 'eventosServices', '$cookieStore','evento',
    function ($scope, $rootScope, $mdDialog, $mdSidenav, $location, eventosServices, $cookieStore, evento) {
        $scope.user = $rootScope.Globals.CurrentUserCot;
        $scope.variable = $rootScope.evento;
        $scope.evento = evento;
        $scope.loading = false;
        $scope.lineas = [];
        $scope.busqueda = {
            vchNombre: '',
            intLineaProdID: 0
        };
        $scope.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        function load() {
            $scope.loading = true;
            $scope.lineas = [];
            //var Request = {
            //    token: $rootScope.Globals.CurrentUserCot.Token,
            //    id: $rootScope.Globals.CurrentUserCot.intUsuarioID,
            //    Busqueda: $scope.busqueda,
            //    intLineaProdID: $scope.busqueda.intLineaProdID
            //};
            //eventosServices.ObtenerEventos(Request, function (responseEvent) {
            //    $scope.eventos = responseEvent;
            //    $scope.groupToPages($scope.eventos);
            //    eventosServices.ObtenerLineaProd(Request, function (responseLinea) {
                    $scope.loading = false;
            //        $scope.lineas = [{ intLineaProdID: 0, vchLinea: 'Todas' }];
            //        for (i = 0; i < responseLinea.length; i++)
            //            $scope.lineas.push(responseLinea[i]);
            //    });
            //});
        }
        load();
    }]);