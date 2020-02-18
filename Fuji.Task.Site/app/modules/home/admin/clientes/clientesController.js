angular.module('TaskMDL').controller('clientesController', ['$scope', '$rootScope', '$location', '$mdDialog', '$mdSidenav', 'clientesServices', '$compile',
    function ($scope, $rootScope, $location, $mdDialog, $mdSidenav, clientesServices, $compile) {
        $scope.user = $rootScope.Globals.CurrentUserCot;
        $scope.AdminClient = false;
        $scope.SAPClient = false;
        $scope.loading = false;
        $scope.reporte = false;
        $scope.clientes = [];
        $scope.perfiles = [];
        $scope.usuario = $rootScope.Globals.CurrentUserCot;
        $scope.busqueda = {
            vchNombre: '',
            intTipoPrecio: 0,
            intAgenteVentas: 0
        };
        try {
            $scope.AdminClient = $scope.user.Permiso.find(x => x.vchClave == 'AdminClient').bitAcceso;
            $scope.SAPClient = $scope.user.Permiso.find(x => x.vchClave == 'SAPClient').bitAcceso;
        }
        catch (Exce) {
            console.log("Error al obtener accesos: " + Exce.Message);
        }

        //var gridDiv = document.querySelector('#myGrid');

        //var gridOptions = {
        //    defaultColDef: {
        //        sortable: true,
        //        resizable: true
        //    },
        //    columnDefs: [
        //        { headerName: 'Nombre', field: 'vchNombre' },
        //        { headerName: 'RFC', field: 'vchRFC' },
        //        { headerName: 'Agente de Ventas', field: 'AgenteVentas' },
        //        { headerName: 'Agente de Cobranza', field: 'AgenteCobranza' },
        //        {
        //            headerName: 'Fecha creación', field: 'datFecha', cellRenderer: (data) => {
        //                return moment(data.datFecha).format('MM/DD/YYYY HH:mm');
        //            }
        //        },
        //        {
        //            headerName: 'Activo', field: 'bitActivo',
        //            cellRendererSelector: function (params) {
        //                var moodDetails = {
        //                    component: 'moodCellRenderer'
        //                };
        //                return moodDetails;
        //            }
        //        }
        //    ],
        //    animateRows: true,
        //    debug: true,
        //    pagination: true,
        //    paginationAutoPageSize: true,
        //    components: {
        //        moodCellRenderer: MoodCellRenderer
        //    }
        //};

        //new agGrid.Grid(gridDiv, gridOptions);

        //function MoodCellRenderer() {
        //}

        //MoodCellRenderer.prototype.init = function (params) {
        //    this.eGui = document.createElement('span');
        //    if (!params.data.bitCompletarDatos) {
        //        var imgForMood = "<i class='fas fa-user-check green' style='color: green' title='Cliente Completo'></i>";
        //        this.eGui.innerHTML = imgForMood;
        //    }
        //    else {
        //        var imgForMood2 = "<i class='fas fa-user-times red' style='color: red' title='Cliente incompleto'></i>";
        //        this.eGui.innerHTML = imgForMood2;
        //    }
        //};

        //MoodCellRenderer.prototype.getGui = function () {
        //    return this.eGui;
        //};

        function load() {
            $scope.loading = true;
            try {
                var Request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Usuario: $rootScope.Globals.CurrentUserCot
                };
                clientesServices.ObtenerClientes(Request, function (responseClientes) {
                    //gridOptions.api.setRowData(responseClientes);
                    //gridOptions.api.sizeColumnsToFit();
                    clientesServices.ObtenerTipoCliente(Request, function (responseTipoCliente) {
                        clientesServices.ObtenerAgenteVentas(Request, function (responseVentas) {
                            $scope.clientes = responseClientes;
                            $scope.groupToPages($scope.clientes);
                            $scope.ventas = [{ intUsuarioID: 0, vchNombre: 'Todos' }];
                            if (responseVentas != null) {
                                for (i = 0; i < responseVentas.length; i++)
                                    $scope.ventas.push(responseVentas[i]);
                            }
                            $scope.precios = [{ intTipoPrecio: 0, vchNombre: 'Todos' }];
                            if (responseTipoCliente != null) {
                                for (i = 0; i < responseTipoCliente.length; i++)
                                    $scope.precios.push(responseTipoCliente[i]);
                            }
                            if ($rootScope.Globals.CurrentUserCot.intTipoUsuarioID == 4) {
                                $scope.busqueda.intAgenteVentas = $rootScope.Globals.CurrentUserCot.intUsuarioID;
                            }
                            $scope.loading = false;
                        });
                    });
                });
            }
            catch (Exce) {
                console.log("Error: " + Exce.Message);
                $scope.loading = false;
            }
        }
        load();

        $scope.AgregarCliente = function (ev) {
            $location.path('/clientes/add');
        };

        $scope.ModificarCliente = function (ev, cliente) {
            $mdDialog.show({
                controller: 'actualizarClienteController',
                templateUrl: 'app/modules/home/admin/clientes/update/actualizarClienteView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    cliente: cliente
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

        $scope.EliminarCliente = function (ev, cliente) {
            var confirm = $mdDialog.confirm({
                title: 'Mensaje de confirmación',
                textContent: '¿Desea cambiar el estatus del usuario: ' + cliente.vchNombre + '?',
                ariaLabel: 'Cambiar estatus usuario',
                targetEvent: ev,
                skipHide: true,
                ok: 'Cambiar',
                cancel: 'Cancelar'
            });
            $mdDialog.show(confirm).then(function () {
                $scope.loading = true;
                var Request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Cliente: cliente,
                    UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
                };
                clientesServices.EliminarCliente(Request, function (response) {
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
        };

        $scope.BuscarCliente = function (ev, busqueda) {
            $scope.loading = true;
            var Request = {
                token: $rootScope.Globals.CurrentUserCot.Token,
                busqueda: busqueda
            };
            clientesServices.BuscarCliente(Request, function (response) {
                $scope.loading = false;
                $scope.clientes = response;
                $scope.groupToPages($scope.clientes);
            });
        };

        $scope.DireccionesCliente = function (ev, cliente) {
            $scope.loading = true;
            $mdDialog.show({
                controller: 'direccionClienteController',
                templateUrl: 'app/modules/home/admin/clientes/direcciones/direccionClienteView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    cliente: cliente
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
            $scope.loading = false;
        };

        $scope.DocumentosCliente = function (ev, cliente) {
            $scope.loading = true;
            $mdDialog.show({
                controller: 'documentosClienteController',
                templateUrl: 'app/modules/home/admin/clientes/documentos/documentosClienteView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    cliente: cliente
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
            $scope.loading = false;
        };

        $scope.CargarDocumentosCliente = function (ev, cliente) {
            $scope.loading = true;
            $mdDialog.show({
                controller: 'cargarDocumentosController',
                templateUrl: 'app/modules/home/admin/clientes/cargarDocs/cargarDocumentosView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    cliente: cliente
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
            $scope.loading = false;
        };

        $scope.CodigoSAPCliente = function (ev, cliente) {
            $scope.loading = true;
            $mdDialog.show({
                controller: 'codigoSAPController',
                templateUrl: 'app/modules/home/admin/clientes/CodigoSAP/codigoSAPView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    cliente: cliente
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
            $scope.loading = false;
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
    }]);
