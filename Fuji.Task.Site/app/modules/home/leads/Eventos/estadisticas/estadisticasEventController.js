angular.module('Task').controller('estadisticasEventController', ['$scope', '$rootScope', '$mdDialog', 'eventosServices', 'evento',
    function ($scope, $rootScope, $mdDialog, eventosServices, evento) {
        $scope.loading = false;
        $scope.existe = false;
        $scope.event = evento;
        $scope.labelsA = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Consultores', 'Productos'];
        $scope.lstAdi = [];
        $scope.dataA = [];

        $scope.labels2 = [];
        $scope.data2 = [];


        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        function load() {
            var Request = {
                token: $rootScope.Globals.CurrentUserCot.Token,
                intEventoID: $scope.event.intEventoID
            };
            eventosServices.ObtenerUsuariosProspectos(Request, function (responseEvent) {
                eventosServices.ObtenerProductosEventoEst(Request, function (responseProd) {
                    eventosServices.ObtenerAdicionalesEventEst(Request, function (responseAdi) {
                        if (responseEvent.Success) {
                            $scope.labelsA = responseEvent.labels;
                            $scope.dataA = responseEvent.Totales;
                        }
                        if (responseProd.Success) {
                            $scope.labels2 = responseProd.labels;
                            $scope.data2 = responseProd.Totales;
                        }
                        if (responseAdi) {
                            $scope.lstAdi = responseAdi;
                        }
                    });
                });
            });
        }
        load();
    }]);
