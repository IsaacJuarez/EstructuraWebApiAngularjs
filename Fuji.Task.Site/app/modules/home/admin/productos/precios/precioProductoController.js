angular.module('TaskMDL').controller('precioProductoController', ['$scope', '$rootScope', '$mdDialog', 'productosServices', 'producto',
    function ($scope, $rootScope, $mdDialog, productosServices, producto) {
        $scope.loading = false;
        $scope.producto = angular.copy(producto);
        $scope.detalles = [];
        $scope.monedas = [];

        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        function load() {
            try {
                $scope.loading = true;
                $scope.monedas = [];
                var request = {
                    intProductoID: $scope.producto.intProductoID,
                    token: $rootScope.Globals.CurrentUserCot.Token
                };
                productosServices.ObtenerMoneda(request, function (responsemoneda) {
                    productosServices.ObtenerPreciosDetalle(request, function (responsePrecios) {
                        $scope.loading = false;
                        $scope.detalles = responsePrecios;
                        $scope.monedas = responsemoneda;
                        if (responsePrecios[0] != null) {
                            $scope.intMonedaID = responsePrecios[0].intMonedaID;
                        }
                    });
                });
            }
            catch (Ex) {
                $scope.loading = false;
                console.log("Error: " + Ex.Message);
            }
        }
        load();

        $scope.GuardarPrecios = function (ev) {
            $scope.loading = true;
            try {
                var request = {
                    Producto: $scope.producto,
                    Precios: $scope.detalles,
                    UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    intMonedaID: $scope.intMonedaID
                };
                productosServices.GuardarPrecios(request, function (response) {
                    $scope.loading = false;
                    var alert = $mdDialog.alert({
                        title: 'Advertencia',
                        textContent: response.Message,
                        ok: 'Aceptar',
                        skipHide: true
                    });
                    if (response.Success) {
                        $mdDialog.show(alert).then(function () {
                            load();
                        });
                    }
                    else {
                        $mdDialog.show(alert);
                    }
                });
            }
            catch (Exce) {
                console.log("Error: " + Exce.Message);
                $scope.loading = false;
            }
        };

        //$scope.AgregarPrecio = function (ev, precio) {
        //    $scope.loading = true;
        //    var request = {
        //        token: $rootScope.Globals.CurrentUserCot.Token,
        //        Precio: precio,
        //        UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID,
        //        Producto: $scope.producto
        //    };
        //    productosServices.AgregarPrecio(request, function (response) {
        //        $scope.loading = false;
        //        var alert = $mdDialog.alert({
        //            title: 'Advertencia',
        //            textContent: response.Message,
        //            ok: 'Aceptar',
        //            skipHide: true
        //        });
        //        $mdDialog.show(alert).then(function () {
        //            load();
        //        });
        //    });
        //};

        //$scope.EditarPrecio = function (ev, precio) {
        //    precio.bitEdit = true;
        //};

        //$scope.CancelPrice = function (ev, precio) {
        //    precio.bitEdit = false;
        //};

        //$scope.SavePrice = function (ev, precio) {
        //    try {
        //        $scope.loading = true;
        //        var request = {
        //            intProductoID: $scope.producto.intProductoID,
        //            token: $rootScope.Globals.CurrentUserCot.Token,
        //            UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID,
        //            Precio: precio
        //        };
        //        productosServices.EditarPrecio(request, function (response) {
        //            $scope.loading = false;
        //            precio.bitEdit = false;
        //            var alert = $mdDialog.alert({
        //                title: 'Advertencia',
        //                textContent: response.Message,
        //                ok: 'Aceptar',
        //                skipHide: true
        //            });
        //            $mdDialog.show(alert);
        //        });
        //    }
        //    catch (Ex) {
        //        $scope.loading = false;
        //        console.log("Error: " + Ex.Message);
        //    }
        //};
    }]);