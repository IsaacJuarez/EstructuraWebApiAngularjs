angular.module('Task').controller('addProductController', ['$scope', '$rootScope', '$mdDialog', 'cotizacionesServices', 'Detalle',
    function ($scope, $rootScope, $mdDialog, cotizacionesServices, Detalle) {
        $scope.loading = false;
        $scope.existe = false;
        $scope.lineas = [];
        $scope.posiblesProductos = [];
        var j = 0;
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        function load() {
            $scope.loading = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    id: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                    Usuario: $rootScope.Globals.CurrentUserCot,
                    intLineaProdID: 0
                };
                cotizacionesServices.ObtenerLineaProd(request, function (responselinea) {
                    $scope.lineas = [{ intLineaProdID: 0, vchLinea: 'Todas' }];
                    for (i = 0; i < responselinea.length; i++)
                        $scope.lineas.push(responselinea[i]);
                    cotizacionesServices.ObtenerProductosBusqueda(request, function (responseProd) {
                        if (Detalle.length > 0) {
                            for (j = 0; j < responseProd.length; j++) {
                                if (objectFindByKey(Detalle, 'intProductoID', responseProd[j].intProductoID)) {
                                    console.log("Existe en la lista.");
                                }
                                else {
                                    $scope.posiblesProductos.push(responseProd[j]);
                                }
                            }
                        } else {
                            $scope.posiblesProductos = responseProd;
                        }
                        $scope.loading = false;
                    });
                });
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Error: " + Exce.message);
            }
        }
        load();

        $scope.back = function () {
            $location.path('/cotizacion');
        };

        function objectFindByKey(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === value) {
                    return array[i];
                }
            }
            return null;
        }

        $scope.querySearch = function (query) {
            return query ? $scope.posiblesProductos.filter(createFilterFor(query)) : $scope.posiblesProductos;
        };

        $scope.selectedItemChange = function (item) {
            $scope.producto = item == undefined ? null : item;
        };

        function createFilterFor(query) {
            var uppercaseQuery = angular.uppercase(query);
            return function filterFn(producto) {
                return producto.vchNombreProducto.includes(uppercaseQuery);
            };
        }

        $scope.FiltrarProductos = function (lineaID) {
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    id: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                    Usuario: $rootScope.Globals.CurrentUserCot,
                    intLineaProdID: lineaID
                };
                cotizacionesServices.ObtenerProductos(request, function (responseProd) {
                    $scope.loading = false;
                    $scope.posiblesProductos = [];
                    if (Detalle.length > 0) {
                        for (j = 0; j < responseProd.length; j++) {
                            if (objectFindByKey(Detalle, 'intProductoID', responseProd[j].intProductoID)) {
                                console.log("Existe en la lista.");
                            }
                            else {
                                $scope.posiblesProductos.push(responseProd[j]);
                            }
                        }
                    } else {
                        $scope.posiblesProductos = responseProd;
                    }
                });
            }
            catch (Exce) {
                console.log("Error: " + Exce.message);
            }
        };

        $scope.AgregarProducto = function (producto, ev) {
            $scope.loading = true;
            var response;
            try {
                response = {
                    Success: true,
                    producto: producto,
                    Message: "Se agregó el producto"
                };
                $mdDialog.hide(response);
            }
            catch (Exce) {
                response = {
                    Success: false
                };
                console.log("Error: " + Exce.message);
                $mdDialog.hide(response);
            }
        };

    }]);