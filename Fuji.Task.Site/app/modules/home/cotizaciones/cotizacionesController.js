angular.module('Task').controller('cotizacionesController', ['$scope', '$rootScope', '$location', '$cookieStore', '$mdDialog', '$mdSidenav', 'cotizacionesServices',
    function ($scope, $rootScope, $location, $cookieStore, $mdDialog, $mdSidenav, cotizacionesServices) {
        $scope.loading = false;
        $scope.reporte = false;
        $scope.Usuario = $rootScope.Globals.CurrentUserCot;
        $scope.usuarios = [];
        $scope.clientes = [];
        $scope.busqueda = {
            vchNombre: '',
            intTipoContizacionID: 0,
            intEstatusCotID: 0
        };
        $scope.searchText = null;
        $scope.AccessAddCotizacion = false;

        function load() {

            $scope.loading = true;

            $scope.AccessAddCotizacion = $rootScope.Globals.CurrentUserCot.intTipoUsuarioID == 1 ? true : ($rootScope.Globals.CurrentUserCot.Permiso.length > 0 ? $rootScope.Globals.CurrentUserCot.Permiso.find(fruit => fruit.vchClave === 'AddCot').bitAcceso : false);


            var Request = {
                token: $rootScope.Globals.CurrentUserCot.Token,
                id: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                Usuario: $rootScope.Globals.CurrentUserCot,
                Busqueda: $scope.busqueda
            };
            cotizacionesServices.ObtenerCotizaciones(Request, function (responseCotizaciones) {
                $scope.cotizaciones = responseCotizaciones;
                $scope.groupToPages($scope.cotizaciones);
                cotizacionesServices.ObtenerClientes(Request, function (responseClientes) {
                    $scope.loading = false;
                    $scope.clientes = [{ intClienteID: 0, vchNombre: 'Todos' }];
                    if (responseClientes != null) {
                        for (i = 0; i < responseClientes.length; i++)
                            $scope.clientes.push(responseClientes[i]);
                    }
                    $scope.posiblesClientes = responseClientes;
                });
            });
        }
        load();

        $scope.querySearch = function (query) {
            return query ? $scope.posiblesClientes.filter(createFilterFor(query)) : $scope.posiblesClientes;
        };

        $scope.selectedItemChange = function (item) {
            $scope.cliente = item == undefined ? null : item;
        };

        function createFilterFor(query) {
            var uppercaseQuery = angular.uppercase(query);
            return function filterFn(cliente) {
                return cliente.vchNombre.includes(uppercaseQuery);
            };
        }

        $scope.AgregarCotizacion = function (ev) {
            $location.path('/cotizacion/add');
        };

        $scope.ModificarCotizacion = function (ev, cotizacion) {
            $rootScope.cotizacion = cotizacion;
            $cookieStore.put('cotizacion', cotizacion);
            $location.path('/cotizacion/update');
        };

        $scope.EnviarCotizacion = function (ev, cotizacion) {
            $mdDialog.show({
                controller: 'sendClientController',
                templateUrl: 'app/modules/home/cotizaciones/sendClient/sendClientView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    cotizacion: cotizacion
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
        //-------------------------------------------------------------------------------

        $scope.AutorizarDescCotizacion = function (ev, cotizacion) {
            try {
                var confirm = $mdDialog.confirm({
                    title: 'Mensaje de confirmación',
                    textContent: '¿Desea autorizar la cotización: ' + cotizacion.vchNombre + '?',
                    ariaLabel: 'Autorizar Descuento Cotización',
                    targetEvent: ev,
                    skipHide: true,
                    ok: 'Autorizar',
                    cancel: 'Cancelar'
                });
                $mdDialog.show(confirm).then(function () {
                    $scope.loading = true;
                    var Request = {
                        token: $rootScope.Globals.CurrentUserCot.Token,
                        cotizacion: cotizacion,
                        UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
                    };
                    cotizacionesServices.AutorizarDescCotizacion(Request, function (response) {
                        $scope.loading = false;
                        var alert = $mdDialog.alert({
                            title: 'Advertencia',
                            textContent: response.Message,
                            ok: 'Aceptar',
                            skipHide: true
                        });
                        $mdDialog.show(alert);
                        if (response.Success)
                            load();
                    });
                }, function () { });
            }
            catch (exce) {
                console.log("Error: " + exce.message);
            }
        };

        $scope.RechazarDescCotizacion = function (ev, cotizacion) {
            $mdDialog.show({
                controller: 'rechazarDescCotizacionController',
                templateUrl: 'app/modules/home/cotizaciones/update/rechazarDescuento/rechazarDescCotizacionView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    cotizacion: cotizacion
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

        $scope.ClienteAceptaCotizacion = function (ev, cotizacion) {
            try {
                $mdDialog.show({
                    controller: 'clienteAceptaController',
                    templateUrl: 'app/modules/home/cotizaciones/update/clienteAcepta/clienteAceptaView.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: true,
                    locals: {
                        cotizacion: cotizacion,
                        TipoVenta: $scope.TipoVentas
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
            }
            catch (exce) {
                console.log("Error: " + exce.message);
            }
        };

        $scope.AprobacionJefeDirecto  = function (ev, cotizacion) {
            try {
                var confirm = $mdDialog.confirm({
                    title: 'Mensaje de confirmación',
                    textContent: '¿Desea solicitar aprobación de la cotización: ' + cotizacion.vchNombre + '?',
                    ariaLabel: 'Solicitar aprobación',
                    targetEvent: ev,
                    skipHide: true,
                    ok: 'Solicitar',
                    cancel: 'Cancelar'
                });
                $mdDialog.show(confirm).then(function () {
                    $scope.loading = true;
                    var Request = {
                        token: $rootScope.Globals.CurrentUserCot.Token,
                        cotizacion: cotizacion,
                        UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
                    };
                    cotizacionesServices.AprobacionJefeDirecto(Request, function (response) {
                        $scope.loading = false;
                        var alert = $mdDialog.alert({
                            title: 'Advertencia',
                            textContent: response.Message,
                            ok: 'Aceptar',
                            skipHide: true
                        });
                        $mdDialog.show(alert);
                        if (response.Success)
                            load();
                    });
                }, function () { });
            }
            catch (exce) {
                console.log("Error: " + exce.message);
            }
        };

        $scope.AutorizarCotJefe = function (ev, cotizacion) {
            try {
                var confirm = $mdDialog.confirm({
                    title: 'Mensaje de confirmación',
                    textContent: '¿Desea aprobar la cotización: ' + cotizacion.vchNombre + '?',
                    ariaLabel: 'Autorizar cotización',
                    targetEvent: ev,
                    skipHide: true,
                    ok: 'Autorizar',
                    cancel: 'Cancelar'
                });
                $mdDialog.show(confirm).then(function () {
                    $scope.loading = true;
                    var Request = {
                        token: $rootScope.Globals.CurrentUserCot.Token,
                        cotizacion: cotizacion,
                        UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
                    };
                    cotizacionesServices.AutorizarCotJefe(Request, function (response) {
                        $scope.loading = false;
                        var alert = $mdDialog.alert({
                            title: 'Advertencia',
                            textContent: response.Message,
                            ok: 'Aceptar',
                            skipHide: true
                        });
                        $mdDialog.show(alert);
                        if (response.Success)
                            load();
                    });
                }, function () { });
            }
            catch (exce) {
                console.log("Error: " + exce.message);
            }
        };

        $scope.RechazarCotJefe = function (ev, cotizacion) {
            try {
                $mdDialog.show({
                    controller: 'rechazarCotizacionController',
                    templateUrl: 'app/modules/home/cotizaciones/update/rechazar/rechazarCotizacionView.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: true,
                    locals: {
                        cotizacion: cotizacion
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
            }
            catch (exce) {
                console.log("Error: " + exce.message);
            }
        };

        $scope.EnviarComite = function (ev, cotizacion) {
            try {
                var confirm = $mdDialog.confirm({
                    title: 'Mensaje de confirmación',
                    textContent: '¿Desea enviar a comité la cotización: ' + cotizacion.vchNombre + '?',
                    ariaLabel: 'Enviar Cotización a comité',
                    targetEvent: ev,
                    skipHide: true,
                    ok: 'Enviar',
                    cancel: 'Cancelar'
                });
                $mdDialog.show(confirm).then(function () {
                    $scope.loading = true;
                    var Request = {
                        token: $rootScope.Globals.CurrentUserCot.Token,
                        cotizacion: cotizacion,
                        UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
                    };
                    cotizacionesServices.EnviarComite(Request, function (response) {
                        $scope.loading = false;
                        var alert = $mdDialog.alert({
                            title: 'Advertencia',
                            textContent: response.Message,
                            ok: 'Aceptar',
                            skipHide: true
                        });
                        $mdDialog.show(alert);
                        if (response.Success)
                            load();
                    });
                }, function () { });
            }
            catch (exce) {
                console.log("Error: " + exce.message);
            }
        };

        $scope.AutorizadaComite = function (ev, cotizacion) {
            try {
                var confirm = $mdDialog.confirm({
                    title: 'Mensaje de confirmación',
                    textContent: '¿Desea cambiar el estatus de la cotización: ' + cotizacion.vchNombre + '?',
                    ariaLabel: 'Autorizada por comité',
                    targetEvent: ev,
                    skipHide: true,
                    ok: 'Autorizar',
                    cancel: 'Cancelar'
                });
                $mdDialog.show(confirm).then(function () {
                    $scope.loading = true;
                    var Request = {
                        token: $rootScope.Globals.CurrentUserCot.Token,
                        cotizacion: cotizacion,
                        UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
                    };
                    cotizacionesServices.AutorizadaComite(Request, function (response) {
                        $scope.loading = false;
                        var alert = $mdDialog.alert({
                            title: 'Advertencia',
                            textContent: response.Message,
                            ok: 'Aceptar',
                            skipHide: true
                        });
                        $mdDialog.show(alert);
                        if (response.Success)
                            load();
                    });
                }, function () { });
            }
            catch (exce) {
                console.log("Error: " + exce.message);
            }
        };

        $scope.RechazadaComite = function (ev, cotizacion) {
            try {
                $mdDialog.show({
                    controller: 'recharzarComiteController',
                    templateUrl: 'app/modules/home/cotizaciones/update/rechazarComite/rechazarComiteView.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: true,
                    locals: {
                        cotizacion: cotizacion
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
            }
            catch (exce) {
                console.log("Error: " + exce.message);
            }
        };

        $scope.Formalizada = function (ev, cotizacion) {
            try {
                var confirm = $mdDialog.confirm({
                    title: 'Mensaje de confirmación',
                    textContent: '¿Desea formalizar la cotización: ' + cotizacion.vchNombre + '?',
                    ariaLabel: 'Formalizar cotización por comité',
                    targetEvent: ev,
                    skipHide: true,
                    ok: 'Formalizar',
                    cancel: 'Cancelar'
                });
                $mdDialog.show(confirm).then(function () {
                    $scope.loading = true;
                    var Request = {
                        token: $rootScope.Globals.CurrentUserCot.Token,
                        cotizacion: cotizacion,
                        UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
                    };
                    cotizacionesServices.Formalizada(Request, function (response) {
                        $scope.loading = false;
                        var alert = $mdDialog.alert({
                            title: 'Advertencia',
                            textContent: response.Message,
                            ok: 'Aceptar',
                            skipHide: true
                        });
                        $mdDialog.show(alert);
                        if (response.Success)
                            load();
                    });
                }, function () { });
            }
            catch (exce) {
                console.log("Error: " + exce.message);
            }
        };

        $scope.Historial = function (ev, cotizacion) {
            try {
                $mdDialog.show({
                    controller: 'historialCotizacionController',
                    templateUrl: 'app/modules/home/cotizaciones/historial/historialCotizacionView.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: true,
                    locals: {
                        cotizacion: cotizacion
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
            }
            catch (exce) {
                console.log("Error: " + exce.message);
            }
        };

        $scope.BuscarCotizacion = function (ev, busqueda) {
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    id: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                    Usuario: $rootScope.Globals.CurrentUserCot,
                    Busqueda: $scope.busqueda
                };
                cotizacionesServices.ObtenerCotizaciones(request, function (responseCotizaciones) {
                    $scope.cotizaciones = responseCotizaciones;
                    $scope.groupToPages($scope.cotizaciones);
                });
            }
            catch (Exce) {
                console.log("Existe un error al realizar la búsqueda: " + Exce.message);
            }
        };

        $scope.EliminarCotizacion = function (ev, cotizacion) {
            try {
                var confirm = $mdDialog.confirm({
                    title: 'Mensaje de confirmación',
                    textContent: '¿Desea cambiar el estatus de la cotización: ' + cotizacion.vchNombre + '?',
                    ariaLabel: 'Cambiar estatus Cotización',
                    targetEvent: ev,
                    skipHide: true,
                    ok: 'Cambiar',
                    cancel: 'Cancelar'
                });
                $mdDialog.show(confirm).then(function () {
                    $scope.loading = true;
                    var Request = {
                        token: $rootScope.Globals.CurrentUserCot.Token,
                        intCotizacionID: cotizacion.intCotizacionID,
                        UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
                    };
                    cotizacionesServices.EliminarCotizacion(Request, function (response) {
                        $scope.loading = false;
                        var alert = $mdDialog.alert({
                            title: 'Advertencia',
                            textContent: response.Message,
                            ok: 'Aceptar',
                            skipHide: true
                        });
                        $mdDialog.show(alert);
                        if (response.Success)
                            load();
                    });
                }, function () { });
            }
            catch (exce) {
                console.log("Error: " + exce.message);
            }
        };
        
    }]);