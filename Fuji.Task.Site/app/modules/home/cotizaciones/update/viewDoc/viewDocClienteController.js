angular.module('Task').controller('viewDocClienteController', ['$scope', '$rootScope', '$mdDialog', 'cotizacionesServices', 'documento',
    function ($scope, $rootScope, $mdDialog, cotizacionesServices, documento) {
        $scope.loading = false;
        $scope.documento = documento;

        function load() {
            $scope.loading = true;
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Documento: $scope.documento
                };
            cotizacionesServices.ObtenerDocumentoDetalleCliente(request, function (response) {
                $scope.ViewDoc = response;
                $scope.vchImagenPath = location.origin + '/Repository/Documentos/' + $scope.ViewDoc.vchPathFile;                
                $scope.loading = false;
                if ($scope.vchImagenPath != "") {
                    if ($scope.documento.intDocClienteID == 9 || $scope.documento.intDocClienteID == 10) {
                        $mdDialog.hide();
                    }
                }
            });
        }
        load();

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }]);