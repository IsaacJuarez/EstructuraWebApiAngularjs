angular.module('Task').controller('addEventosController', ['$scope', '$rootScope', '$mdDialog', 'eventosServices',
    function ($scope, $rootScope, $mdDialog, eventosServices) {
        $scope.loading = false;
        $scope.existe = false;
        $scope.lineaSelected = [];
        $scope.lineas = [];
        $scope.LabelPdf = { color: 'red' };
        $scope.File = false;

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
            eventosServices.ObtenerLineaProd(request, function (responselin) {
                $scope.loading = false;
                $scope.lineas = responselin;
            });
        }
        load();

        $scope.AgregarEvento = function (evento, ev) {
            $scope.loading = true;
            var lineasIDs = "";
            for (i = 0; i < $scope.lineaSelected.length; i++)
                lineasIDs += $scope.lineaSelected[i].intLineaProdID + "*";

            var data = new FormData();
            data.append('vchNombre', evento.vchNombre);
            data.append('datFechaInicio', convert(evento.datFechaInicio));
            data.append('datFechaFin', convert(evento.datFechaFin));
            data.append('intUserID', $rootScope.Globals.CurrentUserCot.intUsuarioID);
            if ($scope.ArchivoPdf != null) {
                data.append('ArchivoImagen', $scope.ArchivoPdf);
            }
            data.append('Token', $rootScope.Globals.CurrentUserCot.Token);
            data.append('intLineaProdID', evento.intLineaProdID);
            data.append('vchAsociacion', evento.vchAsociacion);
            data.append('vchLugar', evento.vchLugar);
            
            //var Request = {
            //    Evento: evento,
            //    Token: $rootScope.Globals.CurrentUserCot.Token,
            //    intUserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
            //};
            eventosServices.AgregarEvento(data, function (response) {
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

        function convert(str) { var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2); return [date.getFullYear(), mnth, day].join("-"); }

        $scope.uploadImagen = function (event) {
            $scope.$apply(function () {
                if (event.target.files) {
                    $scope.LabelPdf.color = '#00695c';
                    $scope.ArchivoPdf = event.target.files[0];
                    $scope.File = true;
                } else {
                    $scope.LabelPdf.color = 'red';
                    $scope.File = false;
                }
            });
        };
    }]);
