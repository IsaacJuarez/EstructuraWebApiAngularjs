angular.module('Task').controller('addDocDirController', ['$scope', '$rootScope', '$mdDialog', 'cotizacionesServices', 'cliente',
    function ($scope, $rootScope, $mdDialog, cotizacionesServices, cliente) {
        $scope.loading = false;
        $scope.Cliente = cliente;
        $scope.FileImagen = false;
        $scope.LabelImagen = { color: 'red' };

        function load() {

        }
        load();

        $scope.uploadImagenProdXLS = function (event) {
            $scope.$apply(function () {
                if (event.target.files) {
                    $scope.LabelImagen.color = '#00695c';
                    $scope.ImagenProd = event.target.files[0];
                    $scope.FileImagen = true;
                } else {
                    $scope.LabelImagen.color = 'red';
                    $scope.FileImagen = false;
                }
            });
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.CargarDocDir = function (doc, ev) {
            $scope.loading = true;
            try {
                //if ($scope.FileUID) {
                var data = new FormData();
                data.append('token', $rootScope.Globals.CurrentUserCot.Token);
                data.append('intUsuarioID', $rootScope.Globals.CurrentUserCot.intUsuarioID);
                data.append('intClienteID', $scope.Cliente.intClienteID);
                data.append('FileDocumento', $scope.ImagenProd);
                data.append('FileName', $scope.ImagenProd.name);

                cotizacionesServices.CargarDocDir(data, function (response) {
                    $scope.loading = false;
                    if (response.client != null) {
                        $mdDialog.hide(response);
                    }
                    else {
                        var alerta = $mdDialog.alert({
                            title: 'Advertencia',
                            textContent: 'Verificar la información: ' + response.Message,
                            ok: 'Aceptar',
                            skipHide: true
                        });
                        $mdDialog.show(alerta);
                    }
                });
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Error: " + Exce.Message);
            }
        };


    }]).directive('customOnChange', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('change', scope.$eval(attrs.customOnChange));
            }
        };
    });