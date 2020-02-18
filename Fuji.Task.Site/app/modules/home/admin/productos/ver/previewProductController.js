angular.module('TaskMDL').controller('previewProductController', ['$scope', '$rootScope', '$mdDialog', 'productosServices', 'producto',
    function ($scope, $rootScope, $mdDialog, productosServices, producto) {
        $scope.loading = false;
        $scope.producto = producto;
       
        function load() {
            $scope.loading = true;
            if ($scope.producto.vbImagen == null) {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Producto: producto
                };
                productosServices.ObtenerDetalleProducto(request, function (response) {
                    $scope.loading = false;
                    if (response.Success) {
                        $scope.producto = response.Producto;
                        //$scope.producto.vchImagenPath = location.origin + '/Repository/' + $scope.producto.vchCodigoProd + ".png";
                    }
                    else {
                        var alert = $mdDialog.alert({
                            title: 'Mensaje del sistema',
                            textContent: response.Message,
                            ok: 'Aceptar',
                            skipHide: true
                        });
                        $mdDialog.show(alert).then(function () {
                            load();
                        });
                    }
                });
            }
        }
        load();

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }]);