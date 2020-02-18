angular.module('Task').controller('actualizarCotizacionController', ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$mdSidenav', '$location', 'cotizacionesServices', '$cookieStore',
    function ($scope, $rootScope, $mdDialog, $mdToast, $mdSidenav, $location, cotizacionesServices, $cookieStore) {
        $scope.loading = false;
        $scope.loadigProducts = false;
        $scope.existe = false;
        $scope.Usuario = $rootScope.Globals.CurrentUserCot;
        $scope.carrito = [];
        $scope.carritoCon = [];
        $scope.tipos = [];
        $scope.TipoProducto = 'Equipo';
        $scope.intLineaProdID = 0;
        $scope.tipoPs = [];
        $scope.intTipoContizacionID = 1;
        $scope.BloqueoForma = false;
        $scope.ClienteCompleto = false;
        $scope.AltaCliente = false;
        $scope.bitSolicitaAutorizacion = false;
        $scope.ProductosAutorizacion = [];

        $scope.TasaFin = .2325;
        $scope.TasaAP = .2325;
        $scope.TasaAF = .2325;
        $scope.TasaFinSeguro = .2325;
        $scope.FactorSeguro = .0095;
        $scope.ComAperturaAP = .01;
        $scope.OpcionCompaAP = .3;

        var ctrl = this;
        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        $scope.ejercicioFinanciero = {
            intPlazoMeses: 0,
            decPrecioTotal: 0,
            decDepositoGarantia: 0,
            decRentaInicial: 0,
            decPagoIniTotal: 0,
            decComAper: 0,
            decRentaMensual: 0,
            decPagoMensualSeguro: 0,
            decUsado: 0,
            decAnticipoFijo: 0,
            decAnticipoOp: 0,
            decAnticipoTot: 0,
            decPagoMensualEq: 0,
            decTasaFin: $scope.TasaFin,
            decTasaAP: $scope.TasaAP,
            decTasaAF: $scope.TasaAF,
            decTasaFinSeguro: $scope.TasaFinSeguro,
            decFactorSeguro: $scope.FactorSeguro,
            decComAperturaAP: $scope.ComAperturaAP,
            decOpcionCompra: $scope.OpcionCompaAP,
            decAnticipoAdi: 0,
            vchDetalleOpe: ''
        };

        $scope.Condicion = {
            intCondicionesCotID: 0,
            bitEntregaN: true,
            bitEntregaS: false,
            intEntrega: 0,
            bitInstalacionN: true,
            bitInstalacionS: false,
            intDiasInstalacion: 0,
            bitGarantiaN: true,
            bitGarantiaS: false,
            intGarantia: 0,
            bitMantenimientoN: true,
            bitMantenimientoS: false,
            bitSoporteAsisTecN: true,
            bitSoporteAsisTecS: false
        };

        $scope.TipoVentas = [];

        ctrl.toastPosition = angular.extend({}, last);

        ctrl.getToastPosition = function () {
            sanitizePosition();

            return Object.keys(ctrl.toastPosition)
                .filter(function (pos) {
                    return ctrl.toastPosition[pos];
                }).join(' ');
        };

        function sanitizePosition() {
            var current = ctrl.toastPosition;

            if (current.bottom && last.top) {
                current.top = false;
            }
            if (current.top && last.bottom) {
                current.bottom = false;
            }
            if (current.right && last.left) {
                current.left = false;
            }
            if (current.left && last.right) {
                current.right = false;
            }

            last = angular.extend({}, current);
        }

        $scope.thresholdOptions = {
            "0": {
                "color": "green"
            },
            "4": {
                "color": "orange"
            },
            "10": {
                "color": "yellow"
            },
            "12": {
                "color": "coral"
            },
            "16": {
                "color": "red"
            }
        };

        //$scope.cotizacion = $cookieStore.get('cotizacion');
        try {
            if ($rootScope.cotizacion != null) {
                $scope.cotizacion = $rootScope.cotizacion;
                if ($scope.cotizacion.intUsuarioID != null) {


                    //if ($scope.cotizacion.intTipoProductoID != null)
                    //    $scope.TipoProducto = $scope.cotizacion.intTipoProductoID == 1 ? 'Equipo' : 'Consumible';
                    $scope.ClienteSelected = {
                        intClienteID: $scope.cotizacion.intClienteID,
                        vchNombre: $scope.cotizacion.vcNombreCliente
                    };
                }
                else {
                    $location.path('/cotizacion');
                }
            }
            else {
                $location.path('/cotizacion');
            }
        }
        catch (Exce) {
            $location.path('/cotizacion');
            console.log("Error: " + Exce.message);
        }

        $scope.CambiarBitN = function (ev) {
            $scope.Condicion.bitSoporteAsisTecS = !$scope.Condicion.bitSoporteAsisTecN;
        };

        $scope.CambiarBitS = function (ev) {
            $scope.Condicion.bitSoporteAsisTecN = !$scope.Condicion.bitSoporteAsisTecS;
        };

        $scope.CambiarMantenimientoN = function (ev) {
            $scope.Condicion.bitMantenimientoS = !$scope.Condicion.bitMantenimientoN;
        };

        $scope.CambiarMantenimientoS = function (ev) {
            $scope.Condicion.bitMantenimientoN = !$scope.Condicion.bitMantenimientoS;
        };

        $scope.CambiarGarantiaN = function (ev) {
            $scope.Condicion.bitGarantiaS = !$scope.Condicion.bitGarantiaN;
            var test = document.getElementsByName('intGarantia')[0];

            if ($scope.Condicion.bitGarantiaS) {
                setTimeout(() => {
                    test.focus();
                }, 0);

            }
        };

        $scope.CambiarGarantiaS = function (ev) {
            $scope.Condicion.bitGarantiaN = !$scope.Condicion.bitGarantiaS;
            try {
                var test = document.getElementsByName('intGarantia')[0];

                if ($scope.Condicion.bitGarantiaS) {
                    setTimeout(() => {
                        test.focus();
                    }, 0);
                }
            }
            catch (Exce) {
                console.log("Error en CambiarGarantiaS: " + Exce.message);
            }
        };

        $scope.CambiarInstalacionN = function (ev) {
            $scope.Condicion.bitInstalacionS = !$scope.Condicion.bitInstalacionN;
            var test = document.getElementsByName('intDiasInstalacion')[0];

            if ($scope.Condicion.bitInstalacionS) {
                setTimeout(() => {
                    test.focus();
                }, 0);

            }
        };

        $scope.CambiarInstalacionS = function (ev) {
            $scope.Condicion.bitInstalacionN = !$scope.Condicion.bitInstalacionS;
            try {
                var test = document.getElementsByName('intDiasInstalacion')[0];

                if ($scope.Condicion.bitInstalacionS) {
                    setTimeout(() => {
                        test.focus();
                    }, 0);
                }
            }
            catch (Exce) {
                console.log("Error en CambiarGarantiaS: " + Exce.message);
            }
        };

        $scope.CambiarEntregaN = function (ev) {
            $scope.Condicion.bitEntregaS = !$scope.Condicion.bitEntregaN;
            //var test = document.getElementsByName('intEntrega')[0];

            //if ($scope.Condicion.bitEntregaS) {
            //    setTimeout(() => {
            //        test.focus();
            //    }, 0);

            //}
        };

        $scope.CambiarEntregaS = function (ev) {
            $scope.Condicion.bitEntregaN = !$scope.Condicion.bitEntregaS;
            //var test = document.getElementsByName('intEntrega')[0];

            //if ($scope.Condicion.bitEntregaS) {
            //    setTimeout(() => {
            //        test.focus();
            //    }, 0);

            //}
        };


        //Cliente
        $scope.DireccionesEntrega = [];

        $scope.toggleRight = buildToggler('right');

        $scope.isOpenRight = function () {
            return $mdSidenav('right').isOpen();
        };

        $scope.abrirMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        function buildToggler(navID) {
            return function () {
                $mdSidenav(navID)
                    .toggle();
            };
        }

        $scope.ejercicioTotal = {
            granTotal: 0,
            descuento: 0,
            Total: 0
        };

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };


        function load() {
            $scope.loading = true;
            $scope.loadigProducts = true;
            try {
                if ($scope.cotizacion != null) {
                    var request = {
                        token: $rootScope.Globals.CurrentUserCot.Token,
                        id: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                        Usuario: $rootScope.Globals.CurrentUserCot,
                        Cotizacion: $scope.cotizacion,
                        TipoProducto: $scope.TipoProducto == 'Equipo' ? 1 : 2,
                        LineaProdID: $scope.intLineaProdID
                    };

                    cotizacionesServices.ObtenerMoneda(request, function (responseMoneda) {
                        $scope.tipoMon = responseMoneda;
                    });

                    $scope.BloqueoForma = $scope.cotizacion.intUsuarioID != $scope.Usuario.intUsuarioID || ($scope.cotizacion.intEstatusCotID != 1 && $scope.cotizacion.intEstatusCotID != 5 && $scope.cotizacion.intEstatusCotID != 3);

                    cotizacionesServices.ObtenerCotizacionDetalle(request, function (responseCot) {
                        if (responseCot.Success != null) {
                            $scope.cotizacion = responseCot.cotizacion;
                            $scope.carrito = $scope.cotizacion.carrito;
                            if ($scope.cotizacion.Direcciones)
                                cargaDirecciones($scope.cotizacion.Direcciones);
                            if ($scope.cotizacion.CondicionesCot)
                                cargaCondiciones($scope.cotizacion.CondicionesCot);
                            if ($scope.cotizacion.TipoVenta)
                                cargaTipoVenta($scope.cotizacion.TipoVenta);
                        }
                        $scope.ejercicioTotal.granTotal = 0;
                        $scope.ejercicioTotal.descuento = $scope.cotizacion.decDescuento;

                        var requFac = {
                            token: $rootScope.Globals.CurrentUserCot.Token,
                            intFactorID: $scope.cotizacion.intFactorID
                        };
                        cotizacionesServices.ObtenerFactorCambioFactorID(requFac, function (responseFC) {
                            try {
                                $scope.FactorCambio = responseFC;
                            }
                            catch (Exce) {
                                console.log("Error al obtener el tipo de Factor de cambio: " + Exce.message);
                            }
                        });

                        //$scope.ejercicioTotal.descuento = $scope.cotizacion.decDescuento;
                        for (i = 0; i < $scope.carrito.length; i++) {
                            $scope.ejercicioTotal.granTotal += $scope.carrito[i].decCostoTotal;
                            $scope.ejercicioTotal.Total = $scope.ejercicioTotal.granTotal - (($scope.ejercicioTotal.granTotal * $scope.ejercicioTotal.descuento) / 100);
                        }
                        $scope.loadigProducts = false;
                        request.TipoProducto = $scope.TipoProducto == 'Equipo' ? 1 : 2;
                        cotizacionesServices.ObtenerClientes(request, function (responseClientes) {
                            cotizacionesServices.ObtenerTipoCotizacion(request, function (responseTipoCot) {
                                cotizacionesServices.ObtenerProductosBusqueda(request, function (responseProd) {
                                    cotizacionesServices.ObtenerLineaProd(request, function (responseLinea) {
                                        cotizacionesServices.ObtenerPlazo(request, function (responsePlazo) {
                                            $scope.plazos = responsePlazo;
                                            $scope.loading = false;
                                            $scope.tipos = responseTipoCot;
                                            $scope.posiblesClientes = responseClientes;
                                            $scope.posiblesProductos = responseProd;
                                            $scope.tipoPs = [{ intLineaProdID: 0, vchLinea: 'Todos' }];
                                            for (i = 0; i < responseLinea.length; i++)
                                                $scope.tipoPs.push(responseLinea[i]);
                                        });
                                    });
                                });
                            });
                        });
                    });

                    try {
                        var request1 = {
                            token: $rootScope.Globals.CurrentUserCot.Token,
                            Cliente: $scope.ClienteSelected,
                            intCotizacionID: $scope.cotizacion.intCotizacionID
                        };
                        cotizacionesServices.ObtenerClienteDetalle(request1, function (responseCli) {
                            $scope.cliente = responseCli;
                            request1.Cliente = $scope.cliente;
                            cotizacionesServices.ValidarCliente(request1, function (responseVal) {
                                cotizacionesServices.ObtenerDocumentosCargarCliente(request1, function (responseDocs) {
                                    if (responseVal.Success)
                                        $scope.Validacion = responseVal.Validacion;
                                    if ($scope.Validacion.bitCodigoClienteID) {
                                        $scope.ClienteCompleto = $scope.Validacion.bitDireccionEntrega && $scope.Validacion.bitCodigoClienteID && $scope.Validacion.bitDireccionFiscal;
                                    }
                                    else {
                                        $scope.ClienteCompleto = $scope.Validacion.bitDireccionEntrega && $scope.Validacion.bitCodigoClienteID && $scope.Validacion.bitDireccionFiscal && $scope.Validacion.bitDocumentosCompletos;
                                    }

                                    if ($scope.Validacion.bitCodigoClienteID) {
                                        $scope.AltaCliente = false;
                                    }
                                    else {
                                        $scope.AltaCliente = !$scope.Validacion.bitCodigoClienteID && $scope.Validacion.bitDireccionFiscal && $scope.Validacion.bitDocumentosCompletos;
                                    }

                                    $scope.Documentos = responseDocs;
                                    cotizacionesServices.ObtenerDireccionesEntregaCliente(request1, function (responseDE) {
                                        $scope.DireccionesEntrega = responseDE;
                                        if ($scope.DireccionesEntrega != null) {
                                            if ($scope.DireccionesEntrega.length == 1) {
                                                $scope.DireccionEntregaSelected = $scope.DireccionesEntrega[0];
                                            }
                                        }
                                        cotizacionesServices.ObtenerDireccionesFisicaCliente(request1, function (responseDF) {
                                            $scope.DireccionesFisica = responseDF;
                                            if ($scope.DireccionesFisica != null) {
                                                if ($scope.DireccionesFisica.length == 1) {
                                                    $scope.DireccionFiscalSelected = $scope.DireccionesFisica[0];
                                                    try {
                                                        if ($scope.DireccionFiscalSelected != null) {
                                                            $scope.DireccionFiscalSelected.intCotizacionID = $scope.cotizacion.intCotizacionID;
                                                            var request = {
                                                                token: $rootScope.Globals.CurrentUserCot.Token,
                                                                id: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                                                                Dir: $scope.DireccionFiscalSelected,
                                                                intTipoDireccionID: 1
                                                            };
                                                            cotizacionesServices.SeleccionarDireccion(request, function (response) {
                                                                if (!response.Success) {
                                                                    var alert = $mdDialog.alert({
                                                                        title: 'Advertencia',
                                                                        textContent: response.Message,
                                                                        ok: 'Aceptar',
                                                                        skipHide: true
                                                                    });
                                                                    $mdDialog.show(alert);
                                                                }
                                                            });
                                                        }
                                                    }
                                                    catch (Exce) {
                                                        console.log("Error al seleccionar la direccion fisica del cliente: " + Exce.message);
                                                    }
                                                }
                                            }
                                            $scope.loading = false;
                                        });
                                    });
                                });
                            });
                        });
                    }
                    catch (Exce) {
                        console.log("Error: " + Exce.Message);
                    }
                }
                else {
                    $location.path('/cotizacion');
                }
            }
            catch (Exce) {
                console.log("Existe un error: " + Exce.message);
                $scope.loading = false;
                $scope.loadigProducts = false;
            }
        }
        load();

        $scope.back = function () {
            $location.path('/cotizacion');
        };

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

        $scope.querySearchP = function (query) {
            return query ? $scope.posiblesProductos.filter(createFilterForP(query)) : $scope.posiblesProductos;
        };

        $scope.selectedItemChangeP = function (item) {
            $scope.productoItem = item == undefined ? null : item;
        };

        function createFilterForP(query) {
            var uppercaseQuery = angular.uppercase(query);
            return function filterFnP(productoItem) {
                return productoItem.vchNombreProducto.includes(uppercaseQuery);
            };
        }

        $scope.querySearchDE = function (query) {
            return query ? $scope.DireccionesEntrega.filter(createFilterForDE(query)) : $scope.DireccionesEntrega;
        };

        function createFilterForDE(query) {
            var uppercaseQuery = angular.uppercase(query);
            return function filterFnP(dirEnt) {
                return dirEnt.vchDireccionCorta.includes(uppercaseQuery);
            };
        }

        $scope.selectedItemChangeDE = function (item) {
            try {
                $scope.dirEnt = item == undefined ? null : item;
                if ($scope.dirEnt != null) {
                    $scope.dirEnt.intCotizacionID = $scope.cotizacion.intCotizacionID;
                    var request = {
                        token: $rootScope.Globals.CurrentUserCot.Token,
                        id: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                        Dir: $scope.dirEnt,
                        intTipoDireccionID: 2
                    };
                    cotizacionesServices.SeleccionarDireccion(request, function (response) {
                        if (!response.Success) {
                            var alert = $mdDialog.alert({
                                title: 'Advertencia',
                                textContent: response.Message,
                                ok: 'Aceptar',
                                skipHide: true
                            });
                            $mdDialog.show(alert);
                        }
                    });
                }
            }
            catch (Exce) {
                console.log("Error en selectedItemChangeDE: " + Exce.message);
            }
        };

        $scope.querySearchDF = function (query) {
            return query ? $scope.DireccionesFisica.filter(createFilterForDF(query)) : $scope.DireccionesFisica;
        };

        function createFilterForDF(query) {
            var uppercaseQuery = angular.uppercase(query);
            return function filterFnP(dirFis) {
                return dirFis.vchDireccionCorta.includes(uppercaseQuery);
            };
        }

        $scope.selectedItemChangeDF = function (item) {
            try {
                $scope.dirFis = item == undefined ? null : item;
                if ($scope.dirFis != null) {
                    $scope.dirFis.intCotizacionID = $scope.cotizacion.intCotizacionID;
                    var request = {
                        token: $rootScope.Globals.CurrentUserCot.Token,
                        id: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                        Dir: $scope.dirFis,
                        intTipoDireccionID: 1
                    };
                    cotizacionesServices.SeleccionarDireccion(request, function (response) {
                        if (!response.Success) {
                            var alert = $mdDialog.alert({
                                title: 'Advertencia',
                                textContent: response.Message,
                                ok: 'Aceptar',
                                skipHide: true
                            });
                            $mdDialog.show(alert);
                        }
                    });
                }
            }
            catch (Exce) {
                console.log("Error en selectedItemChangeDF: " + Exce.message);
            }
        };

        $scope.SaveCot = function () {
            $scope.loading = true;
            try {
                if ($scope.ClienteSelected != null) {
                    if ($scope.ProductosAutorizacion.length > 0) {
                        $scope.bitSolicitaAutorizacion = true;
                    }
                    $scope.cotizacion.decDescuento = $scope.ejercicioTotal.descuento;
                    var mdlCondicion = {
                        bitEntrega: $scope.Condicion.bitEntregaS,
                        intEntrega: $scope.Condicion.intEntrega,
                        bitInstalacion: $scope.Condicion.bitInstalacionS,
                        intDiasInstalacion: $scope.Condicion.bitInstalacionN ? 0 : $scope.Condicion.intDiasInstalacion,
                        bitGarantia: $scope.Condicion.bitGarantiaS,
                        intGarantia: $scope.Condicion.bitGarantiaS ? $scope.Condicion.intGarantia : 0,
                        bitMantenimiento: $scope.Condicion.bitMantenimientoS,
                        bitSoporteAsisTec: $scope.Condicion.bitSoporteAsisTecS
                    };
                    if ($scope.carrito.length > 0 || $scope.carritoCon.length > 0) {
                        var request = {
                            Token: $rootScope.Globals.CurrentUserCot.Token,
                            intUserID: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                            Cotizacion: $scope.cotizacion,
                            DetalleCot: $scope.carrito,
                            Cliente: $scope.ClienteSelected,
                            bitSolicitaAutorizacion: $scope.bitSolicitaAutorizacion,
                            TipoVentas: $scope.TipoVentas,
                            Condicion: mdlCondicion
                        };
                        //if ($scope.TipoProducto != null)
                        //    request.Cotizacion.intTipoProductoID = $scope.TipoProducto == 'Equipo' ? 1 : 2;
                        cotizacionesServices.AgregarCotizacion(request, function (responseCot) {
                            $scope.loading = false;
                            if (responseCot.Success) {
                                $location.path('/cotizacion');
                            }
                            else {
                                var alert = $mdDialog.alert({
                                    title: 'Mensaje del sistema',
                                    textContent: responseCot.Message,
                                    ok: 'Aceptar',
                                    skipHide: true
                                });
                                $mdDialog.show(alert);
                            }
                        });
                    }
                    else {
                        $scope.loading = false;
                        var alertP = $mdDialog.alert({
                            title: 'Mensaje del sistema',
                            textContent: "Se debe seleccionar al menos un producto.",
                            ok: 'Aceptar',
                            skipHide: true
                        });
                        $mdDialog.show(alertP);
                    }
                }
                else {
                    $scope.loading = false;
                    var alert = $mdDialog.alert({
                        title: 'Mensaje del sistema',
                        textContent: "Se debe seleccionar un cliente.",
                        ok: 'Aceptar',
                        skipHide: true
                    });
                    $mdDialog.show(alert);
                }
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Error: " + Exce.message);
            }
        };

        $scope.addProduct = function (ev) {
            $mdDialog.show({
                controller: 'addProductUController',
                templateUrl: 'app/modules/home/cotizaciones/update/product/addProductUView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    Detalle: $scope.carrito
                },
                skipHide: true
            }).then(function (response) {
                if (response.Success) {
                    $scope.carrito.push(response.producto);
                    $scope.ejercicioTotal.granTotal = 0;
                    for (i = 0; i < $scope.carrito.length; i++) {
                        $scope.ejercicioTotal.granTotal += $scope.carrito[i].decCostoTotal;
                        $scope.ejercicioTotal.Total = $scope.ejercicioTotal.granTotal - (($scope.ejercicioTotal.granTotal * $scope.ejercicioTotal.descuento) / 100);
                    }
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
        };

        $scope.addProductQuick = function (ev) {
            $scope.loading = true;
            try {
                if ($scope.ProductSelected != null) {
                    $scope.ProductSelectedItem.intDETPrecioProdID = $scope.ProductSelectedItem.precioItem.intDETPrecioProdID;
                    if ($scope.ProductSelected.listaPrecios.length > 0) {
                        if ($scope.Usuario.intTipoVentaID == 2) //distribuidor
                            $scope.ProductSelected.precioItem = $scope.ProductSelected.listaPrecios[2];
                        else
                            $scope.ProductSelected.precioItem = $scope.ProductSelected.listaPrecios[0];
                        if ($scope.cotizacion.intMonedaID == 1 && $scope.ProductSelected.precioItem.intMonedaID == 2) {
                            $scope.ProductSelected.decCostoUnitario = $scope.ProductSelected.precioItem.decPrecio * $scope.FactorCambio.decPrecioDolar;
                            $scope.ProductSelected.precioItem.decPrecio = $scope.ProductSelected.precioItem.decPrecio * $scope.FactorCambio.decPrecioDolar;
                        }
                        else if ($scope.cotizacion.intMonedaID == 2 && $scope.ProductSelected.precioItem.intMonedaID == 1) {
                            $scope.ProductSelected.decCostoUnitario = $scope.ProductSelected.precioItem.decPrecio / $scope.FactorCambio.decPrecioDolar;
                            $scope.ProductSelected.precioItem.decPrecio = $scope.ProductSelected.precioItem.decPrecio / $scope.FactorCambio.decPrecioDolar;
                        }
                        else {
                            $scope.ProductSelected.decCostoUnitario = $scope.ProductSelected.precioItem.decPrecio;
                        }
                    }
                    if ($scope.ProductSelected.bitMostrar) {
                        $scope.ProductSelected.decCostoTotal = $scope.ProductSelected.intCantidad * $scope.ProductSelected.decCostoUnitario;
                        if ($scope.carrito.length > 0) {
                            if (!objectFindByKey($scope.carrito, 'intProductoID', $scope.ProductSelected.intProductoID)) {
                                $scope.carrito.push($scope.ProductSelected);
                            }
                        }
                        else {
                            $scope.carrito.push($scope.ProductSelected);
                        }
                    }
                    else {
                        if ($scope.ProductSelected.Detalle.length > 0) {
                            for (i = 0; i < $scope.ProductSelected.Detalle.length; i++) {
                                $scope.ProductSelectedItem = $scope.ProductSelected.Detalle[i];
                                if ($scope.ProductSelected.Detalle[i].listaPrecios.length > 0) {
                                    if ($scope.Usuario.intTipoVentaID == 2) //distribuidor
                                        $scope.ProductSelectedItem.precioItem = $scope.ProductSelected.Detalle[i].listaPrecios[2];
                                    else
                                        $scope.ProductSelectedItem.precioItem = $scope.ProductSelected.Detalle[i].listaPrecios[0];
                                    if ($scope.cotizacion.intMonedaID == 1 && $scope.ProductSelected.precioItem.intMonedaID == 2) {
                                        $scope.ProductSelectedItem.decCostoTotal = $scope.ProductSelected.Detalle[i].intCantidad * ($scope.ProductSelectedItem.precioItem.decPrecio * $scope.FactorCambio.decPrecioDolar);
                                        $scope.ProductSelectedItem.decCostoUnitario = $scope.ProductSelectedItem.precioItem.decPrecio * $scope.FactorCambio.decPrecioDolar;
                                        $scope.ProductSelectedItem.precioItem.decPrecioCambio = $scope.ProductSelectedItem.precioItem.decPrecio * $scope.FactorCambio.decPrecioDolar;
                                    }
                                    else if ($scope.cotizacion.intMonedaID == 2 && $scope.ProductSelectedItem.precioItem.intMonedaID == 1) {
                                        $scope.ProductSelectedItem.decCostoTotal = $scope.ProductSelected.Detalle[i].intCantidad * ($scope.ProductSelectedItem.precioItem.decPrecio / $scope.FactorCambio.decPrecioDolar);
                                        $scope.ProductSelectedItem.decCostoUnitario = $scope.ProductSelectedItem.precioItem.decPrecio / $scope.FactorCambio.decPrecioDolar;
                                        $scope.ProductSelectedItem.precioItem.decPrecioCambio = $scope.ProductSelectedItem.precioItem.decPrecio / $scope.FactorCambio.decPrecioDolar;
                                    }
                                    else {
                                        $scope.ProductSelectedItem.decCostoTotal = $scope.ProductSelected.Detalle[i].intCantidad * $scope.ProductSelectedItem.precioItem.decPrecio;
                                        $scope.ProductSelectedItem.decCostoUnitario = $scope.ProductSelectedItem.precioItem.decPrecio;
                                    }
                                }
                                if ($scope.carrito.length > 0) {
                                    if (!objectFindByKey($scope.carrito, 'intProductoID', $scope.ProductSelected.Detalle[i].intProductoID)) {
                                        $scope.carrito.push($scope.ProductSelectedItem);
                                    }
                                }
                                else {
                                    $scope.carrito.push($scope.ProductSelectedItem);
                                }
                            }
                        }
                    }

                    $scope.ejercicioTotal.granTotal = 0;
                    for (i = 0; i < $scope.carrito.length; i++) {
                        $scope.ejercicioTotal.granTotal += $scope.carrito[i].decCostoTotal;
                        $scope.ejercicioTotal.Total = $scope.ejercicioTotal.granTotal - (($scope.ejercicioTotal.granTotal * $scope.ejercicioTotal.descuento) / 100);
                    }
                    //Calcular Ejercicio Financiero
                    $scope.ejercicioFinanciero.decPrecioTotal = $scope.ejercicioTotal.Total;
                    if ($scope.cotizacion.decActicipoAdi != null)
                        $scope.ejercicioFinanciero.decAnticipoOp = $scope.cotizacion.decActicipoAdi;

                    try {
                        var opCAP = objectFindByKey($scope.plazos, 'intPlazoID', $scope.cotizacion.intPlazoID);
                        $scope.ejercicioFinanciero.intPlazoMeses = opCAP.intMes;
                        if ($scope.cotizacion.intTipoContizacionID == 2) {// Arendamiento puro
                            if ($scope.cotizacion.intPlazoID > 5) {
                                $scope.ejercicioFinanciero.decPagoMensualSeguro = Pago($scope.TasaFinSeguro / 12, opCAP.intMes, $scope.ejercicioTotal.Total * $scope.FactorSeguro * (opCAP.intMes / 12));
                                $scope.ejercicioFinanciero.decUsado = $scope.ejercicioTotal.Total * opCAP.OCAPDolares;
                                $scope.ejercicioFinanciero.decRentaInicial = $scope.cotizacion.decActicipoAdi;
                                $scope.ejercicioFinanciero.decRentaMensual = PagoUsado($scope.TasaAP / 12, opCAP.intMes, ($scope.ejercicioTotal.Total - $scope.ejercicioFinanciero.decRentaInicial - $scope.ejercicioFinanciero.decUsado), $scope.ejercicioFinanciero.decUsado);
                                $scope.ejercicioFinanciero.decComAper = ($scope.ejercicioTotal.Total - $scope.ejercicioFinanciero.decRentaInicial) * $scope.ComAperturaAP;
                                $scope.ejercicioFinanciero.decDepositoGarantia = $scope.ejercicioFinanciero.decRentaMensual * 2.5;
                                $scope.ejercicioFinanciero.decPagoIniTotal = $scope.ejercicioFinanciero.decRentaInicial + $scope.ejercicioFinanciero.decDepositoGarantia;
                            }
                            else {
                                $scope.ejercicioFinanciero.decUsado = 0;
                                $scope.ejercicioFinanciero.decPagoMensualSeguro = 0;
                                $scope.ejercicioFinanciero.decRentaMensual = 0;
                                $scope.ejercicioFinanciero.RentaInicial = 0;
                                $scope.ejercicioFinanciero.decComAper = 0;
                                $scope.ejercicioFinanciero.decDepositoGarantia = 0;
                                $scope.ejercicioFinanciero.decPagoIniTotal = 0;
                            }
                        }
                        if ($scope.cotizacion.intTipoContizacionID == 3) { // Financiamiento
                            if ($scope.cotizacion.intPlazoID >= 4) {
                                $scope.ejercicioFinanciero.decAnticipoFijo = $scope.ejercicioTotal.Total * 0.3;
                            }
                            else {
                                $scope.ejercicioFinanciero.decAnticipoFijo = 0;
                            }
                            $scope.ejercicioFinanciero.decAnticipoTot = $scope.ejercicioFinanciero.decAnticipoFijo + $scope.cotizacion.decActicipoAdi;
                            var capital = $scope.ejercicioTotal.Total - $scope.ejercicioFinanciero.decAnticipoTot;
                            if ($scope.cotizacion.intPlazoID >= 4) {

                                $scope.ejercicioFinanciero.decPagoMensualEq = Pago($scope.TasaFin / 12, opCAP.intMes, capital);
                            }
                            else {
                                $scope.ejercicioFinanciero.decPagoMensualEq = VF($scope.TasaFin / 12, opCAP.intMes, capital);
                            }
                            if ($scope.cotizacion.intPlazoID > 4) {
                                $scope.ejercicioFinanciero.decPagoMensualSeguro = Pago($scope.TasaFinSeguro / 12, opCAP.intMes, $scope.ejercicioTotal.Total * $scope.FactorSeguro * (opCAP.intMes / 12));
                            }
                            else {
                                if ($scope.cotizacion.intPlazoID == 4) {
                                    $scope.ejercicioFinanciero.decPagoMensualSeguro = VF($scope.TasaFinSeguro / 12, opCAP.intMes, $scope.ejercicioTotal.Total * $scope.FactorSeguro * (opCAP.intMes / 12));
                                }
                                else {
                                    $scope.ejercicioFinanciero.decPagoMensualSeguro = 0;
                                }
                            }
                        }
                    }
                    catch (Exce) {
                        console.log("Error al calcular el ejercicio financiero: " + Exce.message);
                    }


                    $scope.ProductSelected = null;
                    $scope.loading = false;
                }
            }
            catch (Exce) {
                console.log("Error: " + Exce.message);
                $scope.loading = false;
            }
        };

        $scope.TipoPrecioCambio = function (ev, precioItem, item) {
            try {
                marcarAutorizacion(precioItem, item.intProductoID);
                item.decCostoUnitario = precioItem.decPrecio;
                item.intDETPrecioProdID = precioItem.intDETPrecioProdID;
                $scope.CalcularCosto();
            }
            catch (Exce) {
                console.log("Error: " + Exce.message);
            }
        };

        $scope.TipoPrecioCambioDesc = function (ev, precioItem, item) {
            try {
                marcarAutorizacion(precioItem, item.intProductoID);
                item.decDescuento = precioItem.decPrecioDescuento;
                item.decCostoUnitario = precioItem.decPrecio - (precioItem.decPrecio * (precioItem.decPrecioDescuento / 100));
                item.intDETPrecioProdID = precioItem.intDETPrecioProdID;
                $scope.CalcularCosto();
            }
            catch (Exce) {
                console.log("Error: " + Exce.message);
            }
        };

        $scope.TipoMonedaChange = function (ev, intMonedaID) {
            try {
                if ($scope.carrito.length > 0) {
                    for (i = 0; i < $scope.carrito.length; i++) {
                        if (intMonedaID == 1 && $scope.carrito[i].precioItem.intMonedaID == 2) {
                            $scope.carrito[i].decCostoUnitario = $scope.carrito[i].precioItem.decPrecio * $scope.FactorCambio.decPrecioDolar;
                            $scope.carrito[i].precioItem.decPrecioCambio = $scope.carrito[i].precioItem.decPrecio * $scope.FactorCambio.decPrecioDolar;
                        }
                        else if (intMonedaID == 2 && $scope.carrito[i].precioItem.intMonedaID == 1) {
                            $scope.carrito[i].decCostoUnitario = $scope.carrito[i].precioItem.decPrecio / $scope.FactorCambio.decPrecioDolar;
                            $scope.carrito[i].precioItem.decPrecioCambio = $scope.carrito[i].precioItem.decPrecio / $scope.FactorCambio.decPrecioDolar;
                        }
                        else {
                            $scope.carrito[i].decCostoUnitario = $scope.carrito[i].precioItem.decPrecio;
                            $scope.carrito[i].precioItem.decPrecioCambio = $scope.carrito[i].precioItem.decPrecio;
                        }
                    }
                }
                $scope.CalcularCosto();
            }
            catch (Exce) {
                console.log("Error: " + Exce.message);
            }
        };

        $scope.showSimpleToast = function () {
            var pinTo = ctrl.getToastPosition();
            $mdToast.show(
                $mdToast.simple()
                    .textContent('1 Dolar = $' + $scope.FactorCambio.decPrecioDolar)
                    .position(pinTo)
                    .hideDelay(2000))
                .then(function () {
                    //console.log('Toast dismissed.');
                }).catch(function () {
                    console.log('Toast failed or was forced to close early by another toast.');
                });
        };

        $scope.TipoCotizacion = function (intTipoContizacionID) {
            try {
                $scope.loading = true;
                $scope.intTipoContizacionID = intTipoContizacionID;
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token
                };
                cotizacionesServices.ObtenerPlazo(request, function (responsePlazo) {
                    $scope.loading = false;
                    $scope.plazos = responsePlazo;
                    $scope.CalcularCosto();
                });
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Error: " + Exce.message);
            }
        };

        $scope.CalcularTotal = function (ev) {
            try {
                $scope.validarDescuento();
                var CALCULO = ($scope.ejercicioTotal.granTotal - (($scope.ejercicioTotal.granTotal * $scope.ejercicioTotal.descuento) / 100));
                $scope.ejercicioTotal.Total = CALCULO;
            }
            catch (Exce) {
                $scope.ejercicioTotal.descuento = 0.00;
                var CALCULO2 = ($scope.ejercicioTotal.granTotal - (($scope.ejercicioTotal.granTotal * $scope.ejercicioTotal.descuento) / 100));
                $scope.ejercicioTotal.Total = CALCULO2;
                console.log("Error: " + Exce.message);
            }
        };

        $scope.CalcularDescuento = function (ev) {
            try {
                if ($scope.ejercicioTotal.Total > $scope.ejercicioTotal.granTotal) {
                    $scope.ejercicioTotal.Total = $scope.ejercicioTotal.granTotal;
                }
                $scope.validarDescuento();
                var calculo = (($scope.ejercicioTotal.granTotal - $scope.ejercicioTotal.Total) * 100) / $scope.ejercicioTotal.granTotal;
                $scope.ejercicioTotal.descuento = (calculo);
            }
            catch (Exce) {
                $scope.ejercicioTotal.granTotal = 0.00;
                var calculo3 = ((($scope.ejercicioTotal.granTotal - $scope.ejercicioTotal.Total) * 100) / $scope.ejercicioTotal.granTotal);
                $scope.ejercicioTotal.descuento = (calculo3);
                console.log("Error: " + Exce.message);
            }
        };

        function round(value, decimals) {
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }

        $scope.CalcularCosto = function (ev) {
            try {
                $scope.ejercicioTotal.granTotal = 0;
                for (i = 0; i < $scope.carrito.length; i++) {
                    $scope.carrito[i].decCostoTotal = $scope.carrito[i].intCantidad * $scope.carrito[i].decCostoUnitario;
                    $scope.ejercicioTotal.granTotal += $scope.carrito[i].decCostoTotal;
                    $scope.ejercicioTotal.Total = $scope.ejercicioTotal.granTotal - (($scope.ejercicioTotal.granTotal * $scope.ejercicioTotal.descuento) / 100);
                }
                if ($scope.carritoCon.length > 0) {
                    for (i = 0; i < $scope.carritoCon.length; i++) {
                        $scope.ejercicioTotal.granTotal += $scope.carritoCon[i].decCostoTotal;
                        $scope.ejercicioTotal.Total = $scope.ejercicioTotal.granTotal - (($scope.ejercicioTotal.granTotal * $scope.ejercicioTotal.descuento) / 100);
                    }
                }
                //Calcular Ejercicio Financiero
                $scope.ejercicioFinanciero.decPrecioTotal = $scope.ejercicioTotal.Total;
                if ($scope.cotizacion.decActicipoAdi != null)
                    $scope.ejercicioFinanciero.decAnticipoOp = $scope.cotizacion.decActicipoAdi;
                try {
                    var opCAP = objectFindByKey($scope.plazos, 'intPlazoID', $scope.cotizacion.intPlazoID);
                    $scope.ejercicioFinanciero.intPlazoMeses = opCAP.intMes;
                    if ($scope.cotizacion.intTipoContizacionID == 2) {// Arendamiento puro
                        if ($scope.cotizacion.intPlazoID > 5) {
                            $scope.ejercicioFinanciero.decPagoMensualSeguro = Pago($scope.TasaFinSeguro / 12, opCAP.intMes, $scope.ejercicioTotal.Total * $scope.FactorSeguro * (opCAP.intMes / 12));
                            $scope.ejercicioFinanciero.decUsado = $scope.ejercicioTotal.Total * opCAP.OCAPDolares;
                            $scope.ejercicioFinanciero.decRentaInicial = $scope.cotizacion.decActicipoAdi;
                            $scope.ejercicioFinanciero.decRentaMensual = PagoUsado($scope.TasaAP / 12, opCAP.intMes, ($scope.ejercicioTotal.Total - $scope.ejercicioFinanciero.decRentaInicial - $scope.ejercicioFinanciero.decUsado), $scope.ejercicioFinanciero.decUsado);
                            $scope.ejercicioFinanciero.decComAper = ($scope.ejercicioTotal.Total - $scope.ejercicioFinanciero.decRentaInicial) * $scope.ComAperturaAP;
                            $scope.ejercicioFinanciero.decDepositoGarantia = $scope.ejercicioFinanciero.decRentaMensual * 2.5;
                            $scope.ejercicioFinanciero.decPagoIniTotal = $scope.ejercicioFinanciero.decRentaInicial + $scope.ejercicioFinanciero.decDepositoGarantia;
                        }
                        else {
                            $scope.ejercicioFinanciero.decUsado = 0;
                            $scope.ejercicioFinanciero.decPagoMensualSeguro = 0;
                            $scope.ejercicioFinanciero.decRentaMensual = 0;
                            $scope.ejercicioFinanciero.RentaInicial = 0;
                            $scope.ejercicioFinanciero.decComAper = 0;
                            $scope.ejercicioFinanciero.decDepositoGarantia = 0;
                            $scope.ejercicioFinanciero.decPagoIniTotal = 0;
                        }
                    }
                    if ($scope.cotizacion.intTipoContizacionID == 3) { // Financiamiento
                        $scope.ejercicioFinanciero.decAnticipoAdi = $scope.cotizacion.decActicipoAdi;
                        if ($scope.cotizacion.intPlazoID >= 4) {
                            $scope.ejercicioFinanciero.decAnticipoFijo = $scope.ejercicioTotal.Total * 0.3;
                        }
                        else {
                            $scope.ejercicioFinanciero.decAnticipoFijo = 0;
                        }
                        $scope.ejercicioFinanciero.decAnticipoTot = $scope.ejercicioFinanciero.decAnticipoFijo + $scope.cotizacion.decActicipoAdi;
                        var capital = $scope.ejercicioTotal.Total - $scope.ejercicioFinanciero.decAnticipoTot;
                        if ($scope.cotizacion.intPlazoID >= 4) {

                            $scope.ejercicioFinanciero.decPagoMensualEq = Pago($scope.TasaFin / 12, opCAP.intMes, capital);
                        }
                        else {
                            $scope.ejercicioFinanciero.decPagoMensualEq = VF($scope.TasaFin / 12, opCAP.intMes, capital);
                        }
                        if ($scope.cotizacion.intPlazoID > 4) {
                            $scope.ejercicioFinanciero.decPagoMensualSeguro = Pago($scope.TasaFinSeguro / 12, opCAP.intMes, $scope.ejercicioTotal.Total * $scope.FactorSeguro * (opCAP.intMes / 12));
                        }
                        else {
                            if ($scope.cotizacion.intPlazoID == 4) {
                                $scope.ejercicioFinanciero.decPagoMensualSeguro = VF($scope.TasaFinSeguro / 12, opCAP.intMes, $scope.ejercicioTotal.Total * $scope.FactorSeguro * (opCAP.intMes / 12));
                            }
                            else {
                                $scope.ejercicioFinanciero.decPagoMensualSeguro = 0;
                            }
                        }
                    }
                }
                catch (Exce) {
                    console.log("Error al calcular el ejercicio financiero: " + Exce.message);
                }
            }
            catch (Exce) {
                console.log("Error: " + Exce.message);
            }
        };

        $scope.validarDescuento = function () {
            try {
                if ($scope.ejercicioTotal.descuento >= 0) {
                    if ($scope.ejercicioTotal.descuento >= 100) {
                        $scope.ejerciejercicioTotalcio.descuento = 100;
                    }
                }
                else {
                    $scope.ejercicioTotal.descuento = 0;
                }
            }
            catch (Exce) {
                $scope.ejercicioTotal.descuento = 0
                console.log("Error: " + Exce.message);
            }
        };

        $scope.BorrarRegistros = function (ejercicio, ev) {
            removeElement($scope.carrito, ejercicio);
            $scope.CalcularCosto();
        };

        $scope.BorrarRegistrosCon = function (ejercicio, ev) {
            removeElement($scope.carritoCon, ejercicio);
            $scope.CalcularCosto();
        };

        $scope.SaveEjercicio = function (ejercicioFinanciero, ev) {
            $scope.loading = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Cotizacion: $scope.cotizacion,
                    UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                    Ejercicio: ejercicioFinanciero
                };
                cotizacionesServices.SaveEjercicio(request, function (response) {
                    if (response.Success) {
                        $scope.ejercicioFinanciero = response.ejercicioFinanciero;
                    }
                    var alert = $mdDialog.alert({
                        title: 'Advertencia',
                        textContent: response.Message,
                        ok: 'Aceptar',
                        skipHide: true
                    });
                    $mdDialog.show(alert);
                    $scope.loading = false;
                });
            }
            catch (Exce) {
                console.log("Existe un error al guardar el ejercicio : " + Exce.message);
                $scope.loading = false;
            }
        };

        $scope.PrintEjercicio = function (ev) {
            $scope.loading = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    CotizacionID: $scope.cotizacion.intCotizacionID,
                    intTipoCotizacionID: $scope.cotizacion.intTipoContizacionID,
                    Date: new Date(),
                    Random: getRandomArbitrary(0, 10000000)
                };
                cotizacionesServices.PrintEjercicio(request, function (response) {
                    if (response.Success) {
                        var sampleArr = base64ToArrayBuffer(response.Reporte);
                        saveByteArray(response.NameReport, sampleArr);
                    }
                    $scope.loading = false;
                });
            }
            catch (Exce) {
                console.log("Existe un error en: " + Exce.message);
                $scope.loading = false;
            }
        };

        // Retorna un número aleatorio entre min (incluido) y max (excluido)
        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        function removeElement(array, element) {
            var index = array.indexOf(element);
            if (index >= -1) {
                // modifies array in place
                array.splice(index, 1);
            }
        }

        function objectFindByKey(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === value) {
                    return array[i];
                }
            }
            return null;
        }

        function objectFindByKeyOther(array, key, otherKey, value, otherValue) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === value) {
                    if (array[i][otherKey] === otherValue)
                        return array[i];
                }
            }
            return null;
        }

        function marcarAutorizacion(item, intProductoID) {
            var item1 = {
                intProductoID: intProductoID,
                decPrecio: item.decPrecio,
                intDETPrecioProdID: item.intDETPrecioProdID,
                vchNombrePrecio: item.vchNombrePrecio,
                intTipoPrecio: item.intTipoPrecio,
                bitAutorizacion: item.bitAutorizacion,
                bitMax: item.bitMax
            };
            EliminarProduct(item1, intProductoID);
            if (item.bitAutorizacion) {
                AgregarProduct(item1, intProductoID);
            }
            if (item.bitMax && item.decPrecioDescuento > 0) {
                AgregarProduct(item1, intProductoID);
            }
        }

        function AgregarProduct(item, intProductoID) {
            if ($scope.ProductosAutorizacion.length > 0) {
                if (!objectFindByKeyOther($scope.ProductosAutorizacion, 'intDETPrecioProdID', 'intProductoID', item.intDETPrecioProdID, intProductoID))
                    $scope.ProductosAutorizacion.push(item);
            }
            else {
                $scope.ProductosAutorizacion.push(item);
            }
        }

        function EliminarProduct(item, intProductoID) {
            if ($scope.ProductosAutorizacion.length > 0) {
                if (objectFindByKey($scope.ProductosAutorizacion, 'intProductoID', intProductoID))
                    for (var i = 0; i < $scope.ProductosAutorizacion.length; i++) {
                        {
                            if ($scope.ProductosAutorizacion[i].intProductoID === intProductoID)
                                removeElement($scope.ProductosAutorizacion, $scope.ProductosAutorizacion[i]);
                        }
                    }
            }
        }

        $scope.MostrarRegistros = function (ejercicio, ev) {
            ejercicio.showRegisters = !ejercicio.showRegisters;
        };

        $scope.RechazarCotizacion = function (ev, cotizacion) {
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

        $scope.AutorizarCotizacion = function (ev, cotizacion) {
            try {
                var confirm = $mdDialog.confirm({
                    title: 'Mensaje de confirmación',
                    textContent: '¿Desea autorizar la cotización: ' + cotizacion.vchNombre + '?',
                    ariaLabel: 'Autorizar Cotización',
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
                    cotizacionesServices.AutorizarCotizacion(Request, function (response) {
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

        $scope.TipoProductoChange = function (ev, TipoProducto, intLineaProdID) {
            $scope.loading = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    id: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                    Usuario: $rootScope.Globals.CurrentUserCot,
                    TipoProducto: TipoProducto == 'Equipo' ? 1 : 2,
                    LineaProdID: intLineaProdID
                };
                cotizacionesServices.ObtenerProductosBusqueda(request, function (responseProd) {
                    $scope.loading = false;
                    $scope.posiblesProductos = responseProd;
                });
            }
            catch (exce) {
                $scope.loading = false;
            }
        };

        $scope.VerProducto = function (ev, producto) {
            $mdDialog.show({
                controller: 'viewProductController',
                templateUrl: 'app/modules/home/cotizaciones/add/viewProduct/viewProductView.html',
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

        //Cliente
        $scope.MostrarRegistrosEnt = function (ev) {
            $scope.showRegistersEnt = !$scope.showRegistersEnt;
        };

        $scope.MostrarRegistrosFis = function (ev) {
            $scope.showRegistersFiscal = !$scope.showRegistersFiscal;
        };

        $scope.MostrarRegistrosCC = function (ev) {
            $scope.showRegistersCC = !$scope.showRegistersCC;
        };

        $scope.MostrarRegistrosDC = function (ev) {
            $scope.showRegistersDC = !$scope.showRegistersDC;
        };

        $scope.SolicitarDocumentosCliente = function (ev) {
            $mdDialog.show({
                controller: 'documentosClienteController',
                templateUrl: 'app/modules/home/admin/clientes/documentos/documentosClienteView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    cliente: $scope.cliente
                },
                skipHide: true
            });
        };

        $scope.AgregarDir = function (ev, cliente) {
            $scope.loading = true;
            $mdDialog.show({
                controller: 'addDirClienteController',
                templateUrl: 'app/modules/home/cotizaciones/update/addDirreccion/addDirClienteView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    cliente: $scope.cliente,
                    cotizacionID: $scope.cotizacion.intCotizacionID
                },
                skipHide: true
            }).then(function (response) {
                var request1 = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Cliente: $scope.cliente,
                    intCotizacionID: $scope.cotizacion.intCotizacionID
                };
                cotizacionesServices.ValidarCliente(request1, function (responseVal) {
                    cotizacionesServices.ObtenerDocumentosCargarCliente(request1, function (responseDocs) {
                        if (responseVal.Success)
                            $scope.Validacion = responseVal.Validacion;
                        $scope.Documentos = responseDocs;
                        cotizacionesServices.ObtenerDireccionesEntregaCliente(request1, function (responseDE) {
                            $scope.DireccionesEntrega = responseDE;
                            if ($scope.DireccionesEntrega != null)
                                if ($scope.DireccionesEntrega.length == 1) {
                                    $scope.DireccionEntregaSelected = $scope.DireccionesEntrega[0];
                                }
                            cotizacionesServices.ObtenerDireccionesFisicaCliente(request1, function (responseDF) {
                                $scope.DireccionesFisica = responseDF;
                                if ($scope.DireccionesFisica != null) {
                                    if ($scope.DireccionesFisica.length == 1) {
                                        $scope.DireccionFiscalSelected = $scope.DireccionesFisica[0];
                                    }
                                }
                                $scope.loading = false;
                            });
                        });
                    });
                });
                var alert = $mdDialog.alert({

                    title: 'Mensaje del sistema',
                    textContent: "cambios correctos",
                    ok: 'Aceptar',
                    skipHide: true
                });
                $mdDialog.show(alert).then(function () {

                });
            });
            $scope.loading = false;
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

        $scope.CargarDocumento = function (ev, doc) {
            var mdlClienteDoc = {
                Documento: doc,
                Cliente: $scope.cliente
            };
            $mdDialog.show({
                controller: 'addDocController',
                templateUrl: 'app/modules/home/cotizaciones/add/addDoc/addDocView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                skipHide: true,
                locals: {
                    mdlClienteDoc: mdlClienteDoc
                }
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

        $scope.VerDocumento = function (ev, doc) {
            var documento = {
                intDocClienteID: doc.intDocClienteID,
                intClienteID: $scope.cliente.intClienteID
            };
            $mdDialog.show({
                controller: 'viewDocClienteController',
                templateUrl: 'app/modules/home/cotizaciones/update/viewDoc/viewDocClienteView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                skipHide: true,
                locals: {
                    documento: documento
                }
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

        $scope.AprobacionJefeDirecto = function (ev, cotizacion) {
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

        function Pago(Interes, Plazo, Capital) {
            var pago = 0.0;
            var x = (1 + Interes) ** Plazo;
            var y = Interes * x;
            var z = x - 1;
            var w = y / z;
            var v = Capital * w;
            pago = Capital * ((Interes * ((1 + Interes) ** Plazo)) / (((1 + Interes) ** Plazo) - 1));
            return pago;
        }

        function PagoUsado(Interes, Plazo, Capital, Usado) {
            var pago = 0.0;
            var x = (1 + Interes) ** Plazo;
            var y = Interes * x;
            var z = x - 1;
            var w = y / z;
            var v = (Capital * w) + (Usado * Interes);
            //pago = Capital * ((Interes * ((1 + Interes) ** Plazo)) / (((1 + Interes) ** Plazo) - 1));
            return v;
        }

        function VF(Tasa, Plazo, Capital) {
            var vf = 0.0;
            vf = Capital * ((1 + Tasa) ** Plazo);
            return vf;
        }

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

        function cargaCondiciones(objeto) {
            try {
                if (objeto.bitEntrega) {
                    $scope.Condicion.bitEntregaN = false;
                    $scope.Condicion.bitEntregaS = true;
                }
                else {
                    $scope.Condicion.bitEntregaN = true;
                    $scope.Condicion.bitEntregaS = false;
                }
                if (objeto.bitGarantia) {
                    $scope.Condicion.bitGarantiaN = false;
                    $scope.Condicion.bitGarantiaS = true;
                }
                else {
                    $scope.Condicion.bitGarantiaN = true;
                    $scope.Condicion.bitGarantiaS = false;
                }
                if (objeto.bitInstalacion) {
                    $scope.Condicion.bitInstalacionN = false;
                    $scope.Condicion.bitInstalacionS = true;
                }
                else {
                    $scope.Condicion.bitInstalacionN = true;
                    $scope.Condicion.bitInstalacionS = false;
                }
                if (objeto.bitMantenimiento) {
                    $scope.Condicion.bitMantenimientoN = false;
                    $scope.Condicion.bitMantenimientoS = true;
                }
                else {
                    $scope.Condicion.bitMantenimientoN = true;
                    $scope.Condicion.bitMantenimientoS = false;
                }
                if (objeto.bitSoporteAsisTec) {
                    $scope.Condicion.bitSoporteAsisTecN = false;
                    $scope.Condicion.bitSoporteAsisTecS = true;
                }
                else {
                    $scope.Condicion.bitSoporteAsisTecN = true;
                    $scope.Condicion.bitSoporteAsisTecS = false;
                }
                $scope.Condicion.intCondicionesCotID = objeto.intCondicionesCotID;
                $scope.Condicion.intCotizacionID = objeto.intCotizacionID;
                $scope.Condicion.intDiasInstalacion = objeto.intDiasInstalacion;
                $scope.Condicion.intEntrega = objeto.intEntrega;
                $scope.Condicion.intGarantia = objeto.intGarantia;
            }
            catch (Exce) {
                console.log("Error en cargaCondiciones: " + Exce.message);
            }
        }

        function cargaTipoVenta(objeto) {
            try {
                $scope.TipoVentas = [];
                for (var i = 0; i < objeto.length; i++) {
                    var mdl = {
                        ID: 0,
                        intMes: 0,
                        intFactorID: 0,
                        tipo: '',
                        Plazo: 0,
                        intPlazoID: 0,
                        Fin: false,
                        Arren: false,
                        intMonedaID: 0,
                        intTipoCotizacionID: 0,
                        intParamCotID: 0,
                        intOpcVentaID: 0,
                        bitSeleccion: false,
                        tbl_DET_EjercicioFinanciero: []
                    };
                    switch (objeto[i].intTipoCotizacionID) {
                        case 1://Contado
                            mdl.ID= 1;
                            mdl.tipo = 'Contado';
                            mdl.intTipoCotizacionID = objeto[i].intTipoCotizacionID;
                            mdl.intPlazoID = objeto[i].intPlazoID;
                            mdl.intFactorID = objeto[i].intFactorID;
                            mdl.intParamCotID = objeto[i].intParamCotID;
                            break;
                        case 2:// Arrendamiento Puro
                            switch (objeto[i].intPlazoID) {
                                case 6:
                                    mdl.ID = 11;
                                    mdl.Plazo = 12;
                                    mdl.intMes = 12;
                                    break;
                                case 7:
                                    mdl.ID = 13;
                                    mdl.Plazo = 18;
                                    mdl.intMes = 18;
                                    break;
                                case 8:
                                    mdl.ID = 15;
                                    mdl.Plazo = 24;
                                    mdl.intMes = 24;
                                    break;
                                case 9:
                                    mdl.ID = 17;
                                    mdl.Plazo = 36;
                                    mdl.intMes = 36;
                                    break;
                                case 10:
                                    mdl.ID = 19;
                                    mdl.Plazo = 48;
                                    mdl.intMes = 48;
                                    break;
                                case 11:
                                    mdl.ID = 21;
                                    mdl.Plazo = 60;
                                    mdl.intMes = 60;
                                    break;
                            }
                            mdl.tipo = 'Arrendamiento Puro';
                            mdl.Fin = false;
                            mdl.Arren = true;
                            mdl.intTipoCotizacionID = objeto[i].intTipoCotizacionID;
                            mdl.intPlazoID = objeto[i].intPlazoID;
                            mdl.intFactorID = objeto[i].intFactorID;
                            mdl.intParamCotID = objeto[i].intParamCotID;
                            break;
                        case 3:// Financiamiento
                            switch (objeto[i].intPlazoID) {
                                case 2:
                                    mdl.ID = 4;
                                    mdl.Plazo = 1;
                                    mdl.intMes = 1;
                                    break;
                                case 3:
                                    mdl.ID = 6;
                                    mdl.Plazo = 2;
                                    mdl.intMes = 2;
                                    break;
                                case 4:
                                    mdl.ID = 8;
                                    mdl.Plazo = 3;
                                    mdl.intMes = 3;
                                    break;
                                case 5:
                                    mdl.ID = 10;
                                    mdl.Plazo = 6;
                                    mdl.intMes = 6;
                                    break;
                                case 6:
                                    mdl.ID = 12;
                                    mdl.Plazo = 12;
                                    mdl.intMes = 12;
                                    break;
                                case 7:
                                    mdl.ID = 14;
                                    mdl.Plazo = 18;
                                    mdl.intMes = 18;
                                    break;
                                case 8:
                                    mdl.ID = 16;
                                    mdl.Plazo = 24;
                                    mdl.intMes = 24;
                                    break;
                                case 9:
                                    mdl.ID = 18;
                                    mdl.Plazo = 36;
                                    mdl.intMes = 36;
                                    break;
                                case 10:
                                    mdl.ID = 20;
                                    mdl.Plazo = 48;
                                    mdl.intMes = 48;
                                    break;
                                case 11:
                                    mdl.ID = 22;
                                    mdl.Plazo = 60;
                                    mdl.intMes = 60;
                                    break;
                            }
                            mdl.tipo = 'Financiamiento';
                            mdl.Fin = true;
                            mdl.Arren = false;
                            mdl.intTipoCotizacionID = objeto[i].intTipoCotizacionID;
                            mdl.intPlazoID = objeto[i].intPlazoID;
                            mdl.intFactorID = objeto[i].intFactorID;
                            mdl.intParamCotID = objeto[i].intParamCotID;
                            break;
                        case 4://SXH
                            mdl.ID = 2;
                            mdl.tipo = 'SXH';
                            mdl.intTipoCotizacionID = objeto[i].intTipoCotizacionID;
                            mdl.intPlazoID = objeto[i].intPlazoID;
                            mdl.intFactorID = objeto[i].intFactorID;
                            mdl.intParamCotID = objeto[i].intParamCotID;
                            break;
                    }
                    mdl.intOpcVentaID = objeto[i].intOpcVentaID;
                    mdl.bitSeleccion = objeto[i].bitSeleccion;
                    mdl.tbl_DET_EjercicioFinanciero = objeto[i].tbl_DET_EjercicioFinanciero;
                    $scope.TipoVentas.push(mdl);
                }
            }
            catch (Exce) {
                console.log("Error en cargaTipoVenta: " + Exce.message);
            }
        };

        function cargaDirecciones(objeto) {
            if (objeto.length > 0) {
                $scope.dirEnt = objeto.find(isDirEntrega);
                $scope.DireccionEntregaSelected = $scope.dirEnt;
                $scope.dirFis = objeto.find(isDirFiscal);
            }
        }

        function isDirEntrega(dir) {
            return dir.intTipoDireccionID == 2;
        }

        function isDirFiscal(dir) {
            return dir.intTipoDireccionID == 1;
        }

        $scope.VerEvento = function (ev, item) {
            try {
                if ($scope.cotizacion.intEstatusCotID >= 6 && !item.bitSeleccion) {
                    var a = 0;
                    a += a + 1;
                }
                else {
                    if (item.ID > 2) {
                        $mdDialog.show({
                            controller: 'viewPropuestaController',
                            templateUrl: 'app/modules/home/cotizaciones/add/viewPropuesta/viewPropuestaView.html',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            clickOutsideToClose: false,
                            fullscreen: true,
                            skipHide: true,
                            locals: {
                                tipoventa: item,
                                cotizacion: $scope.cotizacion,
                                Total: $scope.ejercicioTotal
                            }
                        });
                    }
                }
            }
            catch (Exce) {
                console.log("Error al ver la propuesta económica: " + Exce.message);
            }
        };

        $scope.MarcarDireccionValida = function (dir, ev, intTipoDireccionID) {
            try {
                $scope.loading = true;
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    id: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                    Direccion: dir,
                    intTipoDireccionID: intTipoDireccionID,
                    intCotizacionID: $scope.cotizacion.intCotizacionID
                };
                cotizacionesServices.MarcarDireccionValida(request, function (response) {
                    if (!response.Success) {
                        var alert = $mdDialog.alert({
                            title: 'Advertencia',
                            textContent: response.Message,
                            ok: 'Aceptar',
                            skipHide: true
                        });
                        $mdDialog.show(alert);
                    }
                    else {
                        var request1 = {
                            token: $rootScope.Globals.CurrentUserCot.Token,
                            Cliente: $scope.cliente,
                            intCotizacionID: $scope.cotizacion.intCotizacionID
                        };
                        cotizacionesServices.ValidarCliente(request1, function (responseVal) {
                            if (responseVal.Success) {
                                $scope.Validacion = responseVal.Validacion;
                                if ($scope.Validacion.bitCodigoClienteID) {
                                    $scope.ClienteCompleto = $scope.Validacion.bitDireccionEntrega && $scope.Validacion.bitCodigoClienteID && $scope.Validacion.bitDireccionFiscal;
                                }
                                else {
                                    $scope.ClienteCompleto = $scope.Validacion.bitDireccionEntrega && $scope.Validacion.bitCodigoClienteID && $scope.Validacion.bitDireccionFiscal && $scope.Validacion.bitDocumentosCompletos;
                                }
                            }
                        });
                        $scope.loading = false;
                    }
                });
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Error en MarcarDireccionValida: " + Exce.message);
            }
        };

        function formatCurrency(input, blur) {
            // appends $ to value, validates decimal side
            // and puts cursor back in right position.

            // get input value
            var input_val = input.val();

            // don't validate empty input
            if (input_val === "") { return; }

            // original length
            var original_len = input_val.length;

            // initial caret position 
            var caret_pos = input.prop("selectionStart");

            // check for decimal
            if (input_val.indexOf(".") >= 0) {

                // get position of first decimal
                // this prevents multiple decimals from
                // being entered
                var decimal_pos = input_val.indexOf(".");

                // split number by decimal point
                var left_side = input_val.substring(0, decimal_pos);
                var right_side = input_val.substring(decimal_pos);

                // add commas to left side of number
                left_side = formatNumber(left_side);

                // validate right side
                right_side = formatNumber(right_side);

                // On blur make sure 2 numbers after decimal
                if (blur === "blur") {
                    right_side += "00";
                }

                // Limit decimal to only 2 digits
                right_side = right_side.substring(0, 2);

                // join number by .
                input_val = "$" + left_side + "." + right_side;

            } else {
                // no decimal entered
                // add commas to number
                // remove all non-digits
                input_val = formatNumber(input_val);
                input_val = "$" + input_val;

                // final formatting
                if (blur === "blur") {
                    input_val += ".00";
                }
            }

            // send updated string to input
            input.val(input_val);

            // put caret back in the right position
            var updated_len = input_val.length;
            caret_pos = updated_len - original_len + caret_pos;
            input[0].setSelectionRange(caret_pos, caret_pos);
        }

        $scope.SolicitarAltaCliente = function (ev) {
            try {
                $mdDialog.show({
                    controller: 'solicitarAltaClienteController',
                    templateUrl: 'app/modules/home/cotizaciones/update/solicitarAltaCliente/solicitarAltaClienteView.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: true,
                    skipHide: true,
                    locals: {
                        cliente: $scope.cliente,
                        Documentos: $scope.Documentos,
                        intCotizacionID: $scope.cotizacion.intCotizacionID
                    }
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
            catch (Exce) {
                console.log("Error al ver la SolicitarAltaCliente: " + Exce.message);
            }
        };

        $scope.SolicitarAltaDirCliente = function (ev) {
            try {
                $mdDialog.show({
                    controller: 'solAltaDirClienteController',
                    templateUrl: 'app/modules/home/cotizaciones/update/solAltaDirCliente/solAltaDirClienteView.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: true,
                    skipHide: true,
                    locals: {
                        cliente: $scope.cliente,
                        CotizacionID: $scope.cotizacion.intCotizacionID
                    }
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
            catch (Exce) {
                console.log("Error al ver la SolicitarAltaDirCliente: " + Exce.message);
            }
        };
      
    }]).directive('format', ['$filter', function ($filter) {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$formatters.unshift(function (a) {
                    return $filter(attrs.format)(ctrl.$modelValue);
                });

                elem.bind('blur', function (event) {
                    var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                    elem.val($filter(attrs.format)(plainNumber));
                });
            }
        };
    }]);