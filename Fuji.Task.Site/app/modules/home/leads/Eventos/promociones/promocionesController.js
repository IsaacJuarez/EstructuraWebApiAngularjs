angular.module('Task').controller('promocionesController', ['$scope', '$rootScope', '$mdDialog', '$mdSidenav', 'eventosServices', 'evento', '$interval',
    function ($scope, $rootScope, $mdDialog, $mdSidenav, eventosServices, evento, $interval) {
        $scope.loading = false;
        $scope.existe = false;
        $scope.Edit = false;
        $scope.event = evento;
        $scope.labelsA = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Consultores', 'Productos'];
        $scope.lstAdi = [];
        $scope.dataA = [];

        $scope.labels2 = [];
        $scope.data2 = [];
        $scope.Promotions = [];

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function () {
            return $mdSidenav('right').isOpen();
        };

        function buildToggler(navID) {
            return function () {
                $mdSidenav(navID)
                    .toggle();
            };
        }

        function load() {
            $scope.loading = true;
            $scope.counter = 0;
            $interval(function () {
                $scope.counter++;
                if ($scope.counter == 2) {
                    // Do whatever you wanted
                    $scope.Promotions = [{ id: 1, firstName: 'Nombre', lastName: 'Apellido', city: 'Ciudad', state: 'Estado', orderCount: '12', vchPromocion: 'Texto para la promoción.....', bitEdit: false },
                        { id: 2, firstName: 'Nombre 2', lastName: 'Apellido 2', city: 'Ciudad 2', state: 'Estado 2', orderCount: '12', vchPromocion: 'Texto para la promoción.....', bitEdit: false},
                        { id: 1, firstName: 'Nombre', lastName: 'Apellido', city: 'Ciudad', state: 'Estado', orderCount: '12', vchPromocion: 'Texto para la promoción.....', bitEdit: false},
                        { id: 2, firstName: 'Nombre 2', lastName: 'Apellido 2', city: 'Ciudad 2', state: 'Estado 2', orderCount: '12', vchPromocion: 'Texto para la promoción.....', bitEdit: false}];
                    $scope.loading = false;
                }
            }, 1000, 2);

            
            //var Request = {
            //    token: $rootScope.Globals.CurrentUserCot.Token,
            //    intEventoID: $scope.event.intEventoID
            //};
            //eventosServices.ObtenerUsuariosProspectos(Request, function (responseEvent) {
            //    eventosServices.ObtenerProductosEventoEst(Request, function (responseProd) {
            //        eventosServices.ObtenerAdicionalesEventEst(Request, function (responseAdi) {
            //            if (responseEvent.Success) {
            //                $scope.labelsA = responseEvent.labels;
            //                $scope.dataA = responseEvent.Totales;
            //            }
            //            if (responseProd.Success) {
            //                $scope.labels2 = responseProd.labels;
            //                $scope.data2 = responseProd.Totales;
            //            }
            //            if (responseAdi) {
            //                $scope.lstAdi = responseAdi;
            //            }
            //        });
            //    });
            //});
        }
        load();

        $scope.EditPromocion = function (prom) {
            prom.bitEdit = !prom.bitEdit;
        };
    }]);
