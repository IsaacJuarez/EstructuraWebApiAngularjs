angular.module('TaskMDL').controller('paqueteProductoController', ['$scope', '$rootScope', '$mdDialog', 'productosServices', 'producto',
    function ($scope, $rootScope, $mdDialog, productosServices, producto) {
        $scope.loading = false;
        $scope.producto = producto;
        $scope.searchText = null;
        $scope.products = [];

        function load() {
            $scope.loading = true;
            var request = {
                token: $rootScope.Globals.CurrentUserCot.Token,
                Producto: $scope.producto
            };
            productosServices.ObtenerProductosDiscponibles(request, function (response) {
                productosServices.ObtenerProductosPaquete(request, function (responseDet) {
                    $scope.loading = false;
                    $scope.posiblesProductos = response;
                    $scope.products = responseDet;
                });
            });
        }
        load();

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.abrirMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        $scope.posiblesProductos = [];
        $scope.productoItem;

        $scope.selectedItemChange = function (item) {
            $scope.productoItem = item == undefined ? null : item;
        };

        $scope.querySearch = function (query) {
            return query ? $scope.posiblesProductos.filter(createFilterFor(query)) : $scope.posiblesProductos;
        };

        function createFilterFor(query) {
            var uppercaseQuery = angular.uppercase(query);
            return function filterFn(productoItem) {
                return productoItem.vchNombreProducto.includes(uppercaseQuery);
            };
        }

        $scope.AgregarProductosPaq = function (ev) {
            $scope.loading = true;
            try {
                if ($scope.ProductSelected != null) {
                    var selected = {
                        token: $rootScope.Globals.CurrentUserCot.Token,
                        Producto: $scope.producto,
                        Selected: $scope.ProductSelected,
                        UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
                    };
                    productosServices.AgregarProductoPaquete(selected, function (response) {
                        $scope.loading = false;
                        $scope.products.push($scope.ProductSelected);
                        $scope.ProductSelected = null;
                        load();
                        //$scope.posiblesProductos = response;
                    });
                }
            }
            catch (Exce) {
                console.log("Error: " + Exce.Message);
            }
        };

        $scope.EliminarModificacion = function (ev, product) {
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Producto: product,
                    UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
                };
                productosServices.EliminarModificacion(request, function (response) {
                    var alert = $mdDialog.alert({
                        title: 'Mensaje del sistema',
                        textContent: response.Message,
                        ok: 'Aceptar',
                        skipHide: true
                    });
                    $mdDialog.show(alert).then(function () {
                        load();
                    });
                });
            }
            catch (Exce) {
                console.log("Error en EliminarModificacion: " + Exce.Message);
            }
        };
    }]);