angular.module('TaskMDL').controller('productosController', ['$scope', '$rootScope', '$location', '$mdDialog', '$mdSidenav', 'productosServices',
    function ($scope, $rootScope, $location, $mdDialog, $mdSidenav, productosServices) {
        $scope.loading = false;
        $scope.reporte = false;
        $scope.productos = [];
        $scope.lineas = [];
        $scope.busqueda = {
            vchNombreProducto: '',
            intLineaProdID: 0
        };

        function load() {
            $scope.loading = true;
            try {
                $scope.AccessAddProd = $rootScope.Globals.CurrentUserCot.intTipoUsuarioID == 1 ? true : ($rootScope.Globals.CurrentUserCot.Permiso.length > 0 ? $rootScope.Globals.CurrentUserCot.Permiso.find(fruit => fruit.vchClave === 'AddProduct').bitAcceso : false);
            }
            catch (exce) {
                console.log("Error en permisos: " + exce.Message);
            }

            var Request = {
                token: $rootScope.Globals.CurrentUserCot.Token,
                id: $rootScope.Globals.CurrentUserCot.intUsuarioID
            };
            productosServices.ObtenerProductos(Request, function (responseProductos) {
                $scope.productos = responseProductos;
                $scope.groupToPages($scope.productos);
                productosServices.ObtenerLineaProd(Request, function (responseLinea) {
                    $scope.loading = false;
                    $scope.lineas = [{ intLineaProdID: 0, vchLinea: 'Todos' }];
                    for (i = 0; i < responseLinea.length; i++)
                        $scope.lineas.push(responseLinea[i]);
                });
            });
        }
        load();
        $scope.AgregarProducto = function (ev) {
            $mdDialog.show({
                controller: 'agregarProductoController',
                templateUrl: 'app/modules/home/admin/productos/add/agregarProductoView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                skipHide: true
            }).then(function (response) {
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
        };

        $scope.ModificarProducto = function (ev, producto) {
            $mdDialog.show({
                controller: 'actualizarProductoController',
                templateUrl: 'app/modules/home/admin/productos/update/actualizarProductoView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    producto: producto
                },
                skipHide: true
            }).then(function (response) {
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
        };

        $scope.BuscarProducto = function (ev, busqueda) {
            $scope.loading = true;
            var Request = {
                token: $rootScope.Globals.CurrentUserCot.Token,
                id: $rootScope.Globals.CurrentUserCot.intUserID,
                busqueda: busqueda
            };
            productosServices.BuscarProducto(Request, function (response) {
                $scope.loading = false;
                $scope.productos = response;
                $scope.groupToPages($scope.productos);
            });
        };

        $scope.VerProducto = function (ev, producto) {
            $mdDialog.show({
                controller: 'previewProductController',
                templateUrl: 'app/modules/home/admin/productos/ver/previewProductView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                skipHide: true,
                locals: {
                    producto: producto  
                }
            });
        };

        $scope.VerFolleto = function (ev, producto) {
            if (producto.vbFolleto == null) {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Producto: producto
                };
                productosServices.ObtenerDetalleProducto(request, function (response) {
                    if (response.Success) {
                        producto = response.Producto;
                        if (producto.vbFolleto != null) {
                            var sampleArr = base64ToArrayBuffer(producto.vbFolleto);
                            saveByteArray(producto.vchNombreProducto, sampleArr);
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
                    }
                    else {
                        var alert1 = $mdDialog.alert({
                            title: 'Mensaje del sistema',
                            textContent: response.Message,
                            ok: 'Aceptar',
                            skipHide: true
                        });
                        $mdDialog.show(alert1).then(function () {
                            load();
                        });
                    }
                });
            }
        };

        $scope.VerFolletoOtro = function (ev, producto) {
            if (producto.vbFolleto == null) {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Producto: producto
                };
                productosServices.ObtenerDetalleProducto(request, function (response) {
                    if (response.Success) {
                        producto = response.Producto;
                        if (producto.vbFolletoVet != null) {
                            var sampleArr = base64ToArrayBuffer(producto.vbFolletoVet);
                            saveByteArray(producto.vchNombreProducto, sampleArr);
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
                    }
                    else {
                        var alert1 = $mdDialog.alert({
                            title: 'Mensaje del sistema',
                            textContent: response.Message,
                            ok: 'Aceptar',
                            skipHide: true
                        });
                        $mdDialog.show(alert1).then(function () {
                            load();
                        });
                    }
                });
            }
        };

        $scope.ModificarPrecios = function (ev, producto) {
            $mdDialog.show({
                controller: 'precioProductoController',
                templateUrl: 'app/modules/home/admin/productos/precios/precioProductoView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                skipHide: true,
                locals: {
                    producto: producto
                }
            });
        };

        $scope.PaqueteProductos = function (ev, producto) {
            $mdDialog.show({
                controller: 'paqueteProductoController',
                templateUrl: 'app/modules/home/admin/productos/relacion/paqueteProductoView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                skipHide: true,
                locals: {
                    producto: producto
                }
            });
        };

        $scope.EliminarProducto = function (ev, producto) {
            try {
                $scope.loading = true;
                var Request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                    Producto: producto.intProductoID
                };
                productosServices.EliminarProducto(Request, function (responseProductos) {
                    $scope.loading = false;
                    var alert = $mdDialog.alert({
                        title: 'Advertencia',
                        textContent: responseProductos.Message,
                        ok: 'Aceptar',
                        skipHide: true
                    });
                    $mdDialog.show(alert);
                    if (response.Success)
                        load();
                });
            }
            catch (exce) {
                console.log("Error: " + exce.Message);
                $scope.loading = false;
            }
        };

        //------------------------------------------------------------------------------
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
        $scope.abrirMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
        $scope.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
        $scope.itemsPerPage = 15;
        $scope.pagedItems = [];
        $scope.currentPage = 0;
        function clone(obj) {
            if (obj === null || typeof (obj) !== 'object')
                return obj;

            var temp = new obj.constructor();
            for (var key in obj)
                temp[key] = clone(obj[key]);
            return temp;
        }
        $scope.groupToPages = function (lista) {
            $scope.pagedItems = [];
            if (lista !== null) {
                var i;
                for (i = 0; i < lista.length; i++) {
                    if (i % $scope.itemsPerPage === 0) {
                        $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [clone(lista[i])];
                    } else {
                        $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push(clone(lista[i]));
                    }
                }
            }
            $scope.currentPage = 0;
        };
        $scope.range = function (start, end) {
            var ret = [];
            if (!end) {
                end = start;
                start = 0;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }
            return ret;
        };
        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };
        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;
            }
        };
        $scope.setPage = function () {
            $scope.currentPage = this.n;
        };

        function saveByteArray(reportName, byte) {
            var blob = new Blob([byte], { type: "application/pdf" });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            var fileName = reportName;
            link.download = fileName;
            link.click();
        }

        function base64ToArrayBuffer(base64) {
            var binaryString = window.atob(base64);
            var binaryLen = binaryString.length;
            var bytes = new Uint8Array(binaryLen);
            for (var i = 0; i < binaryLen; i++) {
                var ascii = binaryString.charCodeAt(i);
                bytes[i] = ascii;
            }
            return bytes;
        }
    }]);