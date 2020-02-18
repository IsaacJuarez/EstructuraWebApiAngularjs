angular.module('Task').controller('agregarCotizacionController', ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$mdSidenav', '$location', 'cotizacionesServices',
    function ($scope, $rootScope, $mdDialog, $mdToast, $mdSidenav, $location, cotizacionesServices) {
        $scope.loading = false;
        $scope.existe = false;
        $scope.Usuario = $rootScope.Globals.CurrentUserCot;
        $scope.carrito = [];
        $scope.carritoCon = [];
        $scope.tipos = [];
        $scope.plazos = [];
        var todayTime = new Date();
        $scope.TipoProducto = 'Equipo';
        $scope.FactorCambio = {
            bitActivo: false,
            datFecha: Date.now(),
            intUserSys: 0,
            decPrecioDolar: 0.00,
            datFechaFin: Date.now(),
            datFechaInicio: Date.now()
        };
        $scope.intLineaProdID = 0;
        $scope.tipoPs = [];
        $scope.tipoMon = [];
        $scope.intTipoContizacionID = 1;
        $scope.ProductosAutorizacion = [];
        $scope.bitSolicitaAutorizacion = false;
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
        $scope.BitObservaciones = false;

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

        $scope.ejercicioFinancieroItem = {
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

        //---
        $scope.Documentos = [];


        $scope.cotizacion = {
            vchNombre: 'Cotización_' + todayTime.getFullYear() + ('00' + (todayTime.getMonth() + 1)).substr(1, 2) + todayTime.getDate() + ('0' + (todayTime.getHours())).substr(1, 2) + ('0' + (todayTime.getMinutes())).substr(1, 2),
            intTipoContizacionID: 1,
            intMonedaID: 2,
            intFactorID: 0,
            decActicipoAdi: 0.00
        };

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

        $scope.ejercicio = {
            granTotal: 0,
            descuento: 0,
            Total: 0
        };

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

        function load() {
            $scope.loading = true;
            var request = {
                token: $rootScope.Globals.CurrentUserCot.Token,
                id: $rootScope.Globals.CurrentUserCot.intUsuarioID,
                Usuario: $rootScope.Globals.CurrentUserCot,
                TipoProducto: $scope.TipoProducto == 'Equipo' ? 1 : 2,
                LineaProdID: $scope.intLineaProdID
            };
            cotizacionesServices.ObtenerFactorCambio(request, function (responseFC) {
                try {
                    $scope.FactorCambio = responseFC;
                    $scope.cotizacion.intFactorID = responseFC.intFactorID;
                }
                catch (Exce) {
                    console.log("Error al obtener el tipo de Factor de cambio: " + Exce.message);
                }
            });

            cotizacionesServices.ObtenerClientes(request, function (responseClientes) {
                cotizacionesServices.ObtenerTipoCotizacion(request, function (responseTipoCot) {
                    cotizacionesServices.ObtenerProductosBusqueda(request, function (responseProd) {
                        cotizacionesServices.ObtenerLineaProd(request, function (responseLinea) {
                            cotizacionesServices.ObtenerMoneda(request, function (responseMoneda) {
                                $scope.loading = false;
                                $scope.tipos = responseTipoCot;
                                $scope.posiblesClientes = responseClientes;
                                $scope.posiblesProductos = responseProd;
                                for (i = 0; i < responseMoneda.length; i++)
                                    $scope.tipoMon.push(responseMoneda[i]);
                                $scope.tipoPs = [{ intLineaProdID: 0, vchLinea: 'Todos' }];
                                for (i = 0; i < responseLinea.length; i++)
                                    $scope.tipoPs.push(responseLinea[i]);
                            });
                        });
                    });
                });
            });
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
            //try {
            //    var request = {
            //        token: $rootScope.Globals.CurrentUserCot.Token,
            //        Cliente: $scope.cliente
            //    };
            //    //cotizacionesServices.ValidarCliente(request, function (responseVal) {
            //    //    cotizacionesServices.ObtenerDocumentosCargarCliente(request, function (responseDocs) {
            //    //        if (responseVal.Success)
            //    //            $scope.Validacion = responseVal.Validacion;
            //    //        $scope.Documentos = responseDocs;
            //    //        $scope.loading = false;
            //    //    });
            //    //});
            //}
            //catch (Exce) {
            //    console.log("Error: " + Exce.Message);
            //}
            var int = 0;
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
                return productoItem.vchBusqueda.includes(uppercaseQuery);
            };
        }

        $scope.NuevoCliente = function (ev) {
            $mdDialog.show({
                controller: 'clienteCotizacionController',
                templateUrl: 'app/modules/home/cotizaciones/add/cliente/clienteCotizacionView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    intUsuarioID: $rootScope.Globals.CurrentUserCot
                },
                skipHide: true
            }).then(function (response) {
                if (response.Success) {
                    $scope.ClienteSelected = response.Cliente;
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

        $scope.addProduct = function (ev) {
            $mdDialog.show({
                controller: 'addProductController',
                templateUrl: 'app/modules/home/cotizaciones/add/product/addProductView.html',
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
                $scope.CalcularCostoDetalle();
                if ($scope.ejercicioTotal.descuento > 10)
                    $scope.BitObservaciones = true;
            }
            catch (Exce) {
                $scope.ejercicioTotal.descuento = 0.00;
                var CALCULO2 = ($scope.ejercicioTotal.granTotal - (($scope.ejercicioTotal.granTotal * $scope.ejercicioTotal.descuento) / 100));
                $scope.ejercicioTotal.Total = CALCULO2;
                if ($scope.ejercicioTotal.descuento > 10)
                    $scope.BitObservaciones = true;
                console.log("Error: " + Exce.message);
            }
        };

        $scope.CalcularDescuento = function (ev) {
            try {
                if ($scope.ejercicioTotal.Total > $scope.ejercicioTotal.granTotal) {
                    $scope.ejercicioTotal.Total = $scope.ejercicioTotal.granTotal;
                }
                $scope.validarDescuento();
                var calculo = ((($scope.ejercicioTotal.granTotal - $scope.ejercicioTotal.Total) * 100) / $scope.ejercicioTotal.granTotal);
                $scope.ejercicioTotal.descuento = (calculo);
                $scope.CalcularCostoDetalle();
                if ($scope.ejercicioTotal.descuento > 10)
                    $scope.BitObservaciones = true;
            }
            catch (Exce) {
                $scope.ejercicioTotal.granTotal = 0.00;
                var calculo3 = ((($scope.ejercicioTotal.granTotal - $scope.ejercicioTotal.Total) * 100) / $scope.ejercicioTotal.granTotal);
                $scope.ejercicioTotal.descuento = (calculo3);
                if ($scope.ejercicioTotal.descuento > 10)
                    $scope.BitObservaciones = true;
                console.log("Error: " + Exce.message);
            }
        };

        function round(value, decimals) {
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }

        $scope.CalcularCosto = function (ev) {
            try {
                $scope.ejercicioTotal.granTotal = 0;
                if ($scope.carrito.length > 0) {
                    for (i = 0; i < $scope.carrito.length; i++) {
                        $scope.carrito[i].decCostoTotal = $scope.carrito[i].intCantidad * $scope.carrito[i].decCostoUnitario;
                        $scope.ejercicioTotal.granTotal += $scope.carrito[i].decCostoTotal;
                        $scope.ejercicioTotal.Total = $scope.ejercicioTotal.granTotal - (($scope.ejercicioTotal.granTotal * $scope.ejercicioTotal.descuento) / 100);
                    }
                }
                else {
                    $scope.ejercicioTotal.granTotal = 0;
                    $scope.ejercicioTotal.Total = 0;
                }
                //if ($scope.carritoCon.length > 0) {
                //    for (i = 0; i < $scope.carritoCon.length; i++) {
                //        $scope.ejercicioTotal.granTotal += $scope.carritoCon[i].decCostoTotal;
                //        $scope.ejercicioTotal.Total = $scope.ejercicioTotal.granTotal - (($scope.ejercicioTotal.granTotal * $scope.ejercicioTotal.descuento) / 100);
                //    }
                //}
                ////Calcular Ejercicio Financiero
                //$scope.ejercicioFinanciero.decPrecioTotal = $scope.ejercicioTotal.Total;
                //if ($scope.cotizacion.decActicipoAdi != null) {
                //    $scope.ejercicioFinanciero.decAnticipoOp = $scope.cotizacion.decActicipoAdi;
                //    $scope.ejercicioFinanciero.decAnticipoAdi = $scope.cotizacion.decActicipoAdi;
                //}
                //try {
                //    if ($scope.cotizacion.intPlazoID > 0) {
                //        var opCAP = objectFindByKey($scope.plazos, 'intPlazoID', ($scope.cotizacion.intPlazoID > 0 ? $scope.cotizacion.intPlazoID : 0));
                //        $scope.ejercicioFinanciero.intPlazoMeses = opCAP.intMes;
                //        if ($scope.cotizacion.intTipoContizacionID == 2) {// Arendamiento puro
                //            if ($scope.cotizacion.intPlazoID > 5) {
                //                $scope.ejercicioFinanciero.decPagoMensualSeguro = Pago($scope.TasaFinSeguro / 12, opCAP.intMes, $scope.ejercicioTotal.Total * $scope.FactorSeguro * (opCAP.intMes / 12));
                //                $scope.ejercicioFinanciero.decUsado = $scope.ejercicioTotal.Total * opCAP.OCAPDolares;
                //                $scope.ejercicioFinanciero.decRentaInicial = $scope.cotizacion.decActicipoAdi;
                //                $scope.ejercicioFinanciero.decRentaMensual = PagoUsado($scope.TasaAP / 12, opCAP.intMes, ($scope.ejercicioTotal.Total - $scope.ejercicioFinanciero.decRentaInicial - $scope.ejercicioFinanciero.decUsado), $scope.ejercicioFinanciero.decUsado);
                //                $scope.ejercicioFinanciero.decComAper = ($scope.ejercicioTotal.Total - $scope.ejercicioFinanciero.decRentaInicial) * $scope.ComAperturaAP;
                //                $scope.ejercicioFinanciero.decDepositoGarantia = $scope.ejercicioFinanciero.decRentaMensual * 2.5;
                //                $scope.ejercicioFinanciero.decPagoIniTotal = $scope.ejercicioFinanciero.decRentaInicial + $scope.ejercicioFinanciero.decDepositoGarantia;
                //            }
                //            else {
                //                $scope.ejercicioFinanciero.decUsado = 0;
                //                $scope.ejercicioFinanciero.decPagoMensualSeguro = 0;
                //                $scope.ejercicioFinanciero.decRentaMensual = 0;
                //                $scope.ejercicioFinanciero.RentaInicial = 0;
                //                $scope.ejercicioFinanciero.decComAper = 0;
                //                $scope.ejercicioFinanciero.decDepositoGarantia = 0;
                //                $scope.ejercicioFinanciero.decPagoIniTotal = 0;
                //            }
                //        }
                //        if ($scope.cotizacion.intTipoContizacionID == 3) { // Financiamiento
                            
                //            if ($scope.cotizacion.intPlazoID >= 4) {
                //                $scope.ejercicioFinanciero.decAnticipoFijo = $scope.ejercicioTotal.Total * 0.3;
                //            }
                //            else {
                //                $scope.ejercicioFinanciero.decAnticipoFijo = 0;
                //            }
                //            $scope.ejercicioFinanciero.decAnticipoTot = $scope.ejercicioFinanciero.decAnticipoFijo + $scope.cotizacion.decActicipoAdi;
                //            var capital = $scope.ejercicioTotal.Total - $scope.ejercicioFinanciero.decAnticipoTot;
                //            if ($scope.cotizacion.intPlazoID >= 4) {

                //                $scope.ejercicioFinanciero.decPagoMensualEq = Pago($scope.TasaFin / 12, opCAP.intMes, capital);
                //            }
                //            else {
                //                $scope.ejercicioFinanciero.decPagoMensualEq = VF($scope.TasaFin / 12, opCAP.intMes, capital);
                //            }
                //            if ($scope.cotizacion.intPlazoID > 4) {
                //                $scope.ejercicioFinanciero.decPagoMensualSeguro = Pago($scope.TasaFinSeguro / 12, opCAP.intMes, $scope.ejercicioTotal.Total * $scope.FactorSeguro * (opCAP.intMes / 12));
                //            }
                //            else {
                //                if ($scope.cotizacion.intPlazoID == 4) {
                //                    $scope.ejercicioFinanciero.decPagoMensualSeguro = VF($scope.TasaFinSeguro / 12, opCAP.intMes, $scope.ejercicioTotal.Total * $scope.FactorSeguro * (opCAP.intMes / 12));
                //                }
                //                else {
                //                    $scope.ejercicioFinanciero.decPagoMensualSeguro = 0;
                //                }
                //            }
                //        }
                //    }
                //    else {
                //        $scope.ejercicioFinanciero.decUsado = 0;
                //        $scope.ejercicioFinanciero.decPagoMensualSeguro = 0;
                //        $scope.ejercicioFinanciero.decRentaMensual = 0;
                //        $scope.ejercicioFinanciero.RentaInicial = 0;
                //        $scope.ejercicioFinanciero.decComAper = 0;
                //        $scope.ejercicioFinanciero.decDepositoGarantia = 0;
                //        $scope.ejercicioFinanciero.decPagoIniTotal = 0;
                //        $scope.ejercicioFinanciero.decAnticipoFijo = 0;
                //        $scope.ejercicioFinanciero.decPagoMensualSeguro = 0;
                //    }
                //}
                //catch (Exce) {
                //    console.log("Error al calcular el ejercicio financiero: " + Exce.message);
                //}
            }
            catch (Exce) {
                console.log("Error: " + Exce.message);
            }
        };

        $scope.CalcularCostoDetalle = function () {
            try {
                if ($scope.TipoVentas.length > 0) {
                    for (var i = 0; i < $scope.TipoVentas.length; i++) {
                        if ($scope.TipoVentas[i].tbl_DET_EjercicioFinanciero.length > 0) {
                            for (var j = 0; j < $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero.length; j++) {
                                var request = {
                                    token: $rootScope.Globals.CurrentUserCot.Token,
                                    intPlazoID: $scope.TipoVentas[i].intPlazoID
                                };
                                var mdlEjFin = agregarEjercicioFinSimple($scope.TipoVentas[i].Plazo, $scope.TipoVentas[i].intTipoCotizacionID, $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j]);
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].intPlazoMeses = mdlEjFin.intPlazoMeses;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decPrecioTotal = mdlEjFin.decPrecioTotal;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decDepositoGarantia = mdlEjFin.decDepositoGarantia;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decRentaInicial = mdlEjFin.decRentaInicial;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decPagoIniTotal = mdlEjFin.decPagoIniTotal;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decComAper = mdlEjFin.decComAper;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decRentaMensual = mdlEjFin.decRentaMensual;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decPagoMensualSeguro = mdlEjFin.decPagoMensualSeguro;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decUsado = mdlEjFin.decUsado;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decAnticipoFijo = mdlEjFin.decAnticipoFijo;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decAnticipoOp = mdlEjFin.decAnticipoOp;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decAnticipoTot = mdlEjFin.decAnticipoTot;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decPagoMensualEq = mdlEjFin.decPagoMensualEq;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decTasaFin = mdlEjFin.decTasaFin;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decTasaAP = mdlEjFin.decTasaAP;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decTasaAF = mdlEjFin.decTasaAF;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decTasaFinSeguro = mdlEjFin.decTasaFinSeguro;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decFactorSeguro = mdlEjFin.decFactorSeguro;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decOpcionCompra = mdlEjFin.decOpcionCompra;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decComAperturaAP = mdlEjFin.decComAperturaAP;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].decAnticipoAdi = mdlEjFin.decAnticipoAdi;
                                $scope.TipoVentas[i].tbl_DET_EjercicioFinanciero[j].vchDetalleOpe = $scope.cotizacion.vchDetalleOperacion;
                            }
                        }
                    }
                }
            }
            catch (Exce) {
                console.log("Error CalcularCostoDetalle: " + Exce.message);
            }
        };

        $scope.validarDescuento = function () {
            try {
                if ($scope.ejercicioTotal.descuento >= 0) {
                    if ($scope.ejercicioTotal.descuento >= 100) {
                        $scope.ejercicioTotal.descuento = 100;
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

        $scope.SaveCot = function () {
            $scope.loading = true;
            try {
                if ($scope.ClienteSelected != null) {
                    if ($scope.ejercicioTotal.descuento > 10) {
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

                    if ($scope.carrito.length > 0) {
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

                        //request.Cotizacion.intTipoProductoID = intTipoProductoID;
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

        $scope.addProductQuick = function (ev) {
            $scope.loading = true;
            try {
                if ($scope.ProductSelected != null) {
                    if ($scope.ProductSelected.listaPrecios.length > 0) {
                        if ($scope.Usuario.intTipoVentaID == 2) //distribuidor
                            $scope.ProductSelected.precioItem = $scope.ProductSelected.listaPrecios[2];
                        else 
                            $scope.ProductSelected.precioItem = $scope.ProductSelected.listaPrecios[0];
                        if ($scope.cotizacion.intMonedaID == 1 && $scope.ProductSelected.precioItem.intMonedaID == 2) {
                            $scope.ProductSelected.decCostoUnitario = $scope.ProductSelected.precioItem.decPrecio * $scope.FactorCambio.decPrecioDolar;
                            $scope.ProductSelected.precioItem.decPrecioCambio = $scope.ProductSelected.precioItem.decPrecio * $scope.FactorCambio.decPrecioDolar;
                        }
                        else if ($scope.cotizacion.intMonedaID == 2 && $scope.ProductSelected.precioItem.intMonedaID == 1) {
                            $scope.ProductSelected.decCostoUnitario = $scope.ProductSelected.precioItem.decPrecio / $scope.FactorCambio.decPrecioDolar;
                            $scope.ProductSelected.precioItem.decPrecioCambio = $scope.ProductSelected.precioItem.decPrecio / $scope.FactorCambio.decPrecioDolar;
                        }
                        else {
                            $scope.ProductSelected.decCostoUnitario = $scope.ProductSelected.precioItem.decPrecio;
                        }
                        $scope.ProductSelected.intDETPrecioProdID = $scope.ProductSelected.precioItem.intDETPrecioProdID;
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
                                        $scope.ProductSelectedItem.precioItem = $scope.ProductSelectedItem.listaPrecios[2];
                                    else
                                        $scope.ProductSelectedItem.precioItem = $scope.ProductSelectedItem.listaPrecios[0];
                                    if ($scope.cotizacion.intMonedaID == 1 && $scope.ProductSelectedItem.precioItem.intMonedaID == 2) {
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
                                    $scope.ProductSelectedItem.intDETPrecioProdID = $scope.ProductSelectedItem.precioItem.intDETPrecioProdID;
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
                    $scope.ProductSelected = null;
                    $scope.CalcularCostoDetalle();
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
                    console.log('Toast dismissed.');
                }).catch(function () {
                    console.log('Toast failed or was forced to close early by another toast.');
                });
        };

        $scope.DetalleCliente = function (ev) {
            $mdDialog.show({
                controller: 'detailClientController',
                templateUrl: 'app/modules/home/cotizaciones/add/detailClient/detailClienteView.html',
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

        $scope.MostrarRegistros = function (ejercicio, ev) {
            ejercicio.showRegisters = !ejercicio.showRegisters;
        };

        $scope.MostrarRegistrosCon = function (ejercicio,ev) {
            ejercicio.showRegisters = !ejercicio.showRegisters;
        };

        $scope.BorrarRegistros = function (ejercicio, ev) {
            removeElement($scope.carrito, ejercicio);
            $scope.CalcularCosto();
        };

        $scope.BorrarRegistrosCon = function (ejercicio, ev) {
            removeElement($scope.carritoCon, ejercicio);
        };

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
                bitMax: item.bitMax,
                decDescuento: item.decPrecioDescuento
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
            var test = document.getElementsByName('intGarantia');

            if ($scope.Condicion.bitGarantiaS) {
                setTimeout(() => {
                    test.focus();
                }, 0);
            }
        };

        $scope.CambiarInstalacionN = function (ev) {
            $scope.Condicion.bitInstalacionS = !$scope.Condicion.bitInstalacionN;
            var test = document.getElementsByName('intDiasInstalacion');

            if ($scope.Condicion.bitInstalacionS) {
                setTimeout(() => {
                    test.focus();
                }, 0);

            }
        };

        $scope.CambiarInstalacionS = function (ev) {
            $scope.Condicion.bitInstalacionN = !$scope.Condicion.bitInstalacionS;
            var test = document.getElementsByName('intDiasInstalacion');

            if ($scope.Condicion.bitInstalacionS) {
                setTimeout(() => {
                    test.focus();
                }, 0);

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

        $scope.SolicitarDocumentosCliente = function (cliente, ev) {
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

        function Pago(Interes, Plazo, Capital) {
            var pago = 0.0;
            var x = (1 + Interes) ** Plazo;
            var y = Interes * x;
            var z = x - 1;
            var w = y / z;
            var v = Capital * w;
            //pago = Capital * ((Interes * ((1 + Interes) ** Plazo)) / (((1 + Interes) ** Plazo) - 1));
            pago = v;
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

        // Tipo de Venta
        $scope.AgregarTV = function (ev, Tipo, item) {
            try {
                var mdl = {
                    ID: Tipo,
                    intMes: 0,
                    intFactorID: $scope.cotizacion.intFactorID,
                    tipo: '',
                    Plazo: 0,
                    intPlazoID: 0,
                    Fin: false,
                    Arren: false,
                    intMonedaID: $scope.cotizacion.intMonedaID,
                    intTipoCotizacionID: 0,
                    intParamCotID: 0,
                    tbl_DET_EjercicioFinanciero: []
                };
                switch (Tipo) {
                    case 1://Contado
                        mdl.tipo = 'Contado';
                        mdl.intTipoCotizacionID = 1;
                        break;
                    case 2://SXH
                        mdl.tipo = 'SXH';
                        mdl.intTipoCotizacionID = 4;
                        break;
                    case 3:
                        mdl.tipo = 'Arrendamiento Puro';
                        mdl.Plazo = 1;
                        mdl.intMes = 1;
                        mdl.intPlazoID = 2;
                        mdl.Fin = false;
                        mdl.Arren = true;
                        mdl.intTipoCotizacionID = 2;
                        break;
                    case 4:
                        mdl.tipo = 'Financiamiento';
                        mdl.Plazo = 1;
                        mdl.intMes = 1;
                        mdl.intPlazoID = 2;
                        mdl.Fin = true;
                        mdl.Arren = false;
                        mdl.intTipoCotizacionID = 3;
                        break;
                    case 5:
                        mdl.tipo = 'Arrendamiento Puro';
                        mdl.Plazo = 2;
                        mdl.intMes = 2;
                        mdl.intPlazoID = 3;
                        mdl.Fin = false;
                        mdl.Arren = true;
                        mdl.intTipoCotizacionID = 2;
                        break;
                    case 6:
                        mdl.tipo = 'Financiamiento';
                        mdl.Plazo = 2;
                        mdl.intMes = 2;
                        mdl.intPlazoID = 3;
                        mdl.Fin = true;
                        mdl.Arren = false;
                        mdl.intTipoCotizacionID = 3;
                        break;
                    case 7:
                        mdl.tipo = 'Arrendamiento Puro';
                        mdl.Plazo = 3;
                        mdl.intMes = 3;
                        mdl.intPlazoID = 4;
                        mdl.Fin = false;
                        mdl.Arren = true;
                        mdl.intTipoCotizacionID = 2;
                        break;
                    case 8:
                        mdl.tipo = 'Financiamiento';
                        mdl.Plazo = 3;
                        mdl.intMes = 3;
                        mdl.intPlazoID = 4;
                        mdl.Fin = true;
                        mdl.Arren = false;
                        mdl.intTipoCotizacionID = 3;
                        break;
                    case 9:
                        mdl.tipo = 'Arrendamiento Puro';
                        mdl.Plazo = 6;
                        mdl.intMes = 6;
                        mdl.intPlazoID = 5;
                        mdl.Fin = false;
                        mdl.Arren = true;
                        mdl.intTipoCotizacionID = 2;
                        break;
                    case 10:
                        mdl.tipo = 'Financiamiento';
                        mdl.Plazo = 6;
                        mdl.intMes = 6;
                        mdl.intPlazoID = 5;
                        mdl.Fin = true;
                        mdl.Arren = false;
                        mdl.intTipoCotizacionID = 3;
                        break;
                    case 11:
                        mdl.tipo = 'Arrendamiento Puro';
                        mdl.Plazo = 12;
                        mdl.intMes = 12;
                        mdl.intPlazoID = 6;
                        mdl.Fin = false;
                        mdl.Arren = true;
                        mdl.intTipoCotizacionID = 2;
                        break;
                    case 12:
                        mdl.tipo = 'Financiamiento';
                        mdl.Plazo = 12;
                        mdl.intMes = 12;
                        mdl.intPlazoID = 6;
                        mdl.Fin = true;
                        mdl.Arren = false;
                        mdl.intTipoCotizacionID = 3;
                        break;
                    case 13:
                        mdl.tipo = 'Arrendamiento Puro';
                        mdl.Plazo = 18;
                        mdl.intMes = 18;
                        mdl.intPlazoID = 7;
                        mdl.Fin = false;
                        mdl.Arren = true;
                        mdl.intTipoCotizacionID = 2;
                        break;
                    case 14:
                        mdl.tipo = 'Financiamiento';
                        mdl.Plazo = 18;
                        mdl.intMes = 18;
                        mdl.intPlazoID = 7;
                        mdl.Fin = true;
                        mdl.Arren = false;
                        mdl.intTipoCotizacionID = 3;
                        break;
                    case 15:
                        mdl.tipo = 'Arrendamiento Puro';
                        mdl.Plazo = 24;
                        mdl.intMes = 24;
                        mdl.intPlazoID = 8;
                        mdl.Fin = false;
                        mdl.Arren = true;
                        mdl.intTipoCotizacionID = 2;
                        break;
                    case 16:
                        mdl.tipo = 'Financiamiento';
                        mdl.Plazo = 24;
                        mdl.intMes = 24;
                        mdl.intPlazoID = 8;
                        mdl.Fin = true;
                        mdl.Arren = false;
                        mdl.intTipoCotizacionID = 3;
                        break;
                    case 17:
                        mdl.tipo = 'Arrendamiento Puro';
                        mdl.Plazo = 36;
                        mdl.intMes = 36;
                        mdl.intPlazoID = 9;
                        mdl.Fin = false;
                        mdl.Arren = true;
                        mdl.intTipoCotizacionID = 2;
                        break;
                    case 18:
                        mdl.tipo = 'Financiamiento';
                        mdl.Plazo = 36;
                        mdl.intMes = 36;
                        mdl.intPlazoID = 9;
                        mdl.Fin = true;
                        mdl.Arren = false;
                        mdl.intTipoCotizacionID = 3;
                        break;
                    case 19:
                        mdl.tipo = 'Arrendamiento Puro';
                        mdl.Plazo = 48;
                        mdl.intMes = 48;
                        mdl.intPlazoID = 10;
                        mdl.Fin = false;
                        mdl.Arren = true;
                        mdl.intTipoCotizacionID = 2;
                        break;
                    case 20:
                        mdl.tipo = 'Financiamiento';
                        mdl.Plazo = 48;
                        mdl.intMes = 48;
                        mdl.intPlazoID = 10;
                        mdl.Fin = true;
                        mdl.Arren = false;
                        mdl.intTipoCotizacionID = 3;
                        break;
                    case 21:
                        mdl.tipo = 'Arrendamiento Puro';
                        mdl.Plazo = 60;
                        mdl.intMes = 60;
                        mdl.intPlazoID = 11;
                        mdl.Fin = false;
                        mdl.Arren = true;
                        mdl.intTipoCotizacionID = 2;
                        break;
                    case 22:
                        mdl.tipo = 'Financiamiento';
                        mdl.Plazo = 60;
                        mdl.intMes = 60;
                        mdl.intPlazoID = 11;
                        mdl.Fin = true;
                        mdl.Arren = false;
                        mdl.intTipoCotizacionID = 3;
                        break;
                }
                if (item) {
                    var request = {
                        token: $rootScope.Globals.CurrentUserCot.Token,
                        intPlazoID: mdl.intPlazoID
                    };
                    cotizacionesServices.ObtenerParametrosCot(request, function (responsePC) {
                        cotizacionesServices.ObtenerParametrosOpcionCompra(request, function (responsePOC) {
                            try {
                                if (responsePC) {
                                    $scope.ParamCot = responsePC;
                                    $scope.TasaFin = $scope.ParamCot.decTasaFin;
                                    $scope.TasaAP = $scope.ParamCot.decTasaAP;
                                    $scope.TasaAF = $scope.ParamCot.decTasaAF;
                                    $scope.TasaFinSeguro = $scope.ParamCot.decTasaFinSeguro;
                                    $scope.FactorSeguro = $scope.ParamCot.decFactorSeguro;
                                    $scope.ComAperturaAP = $scope.ParamCot.decComAperturaAP;
                                    $scope.OpcionCompaAP = $scope.ParamCot.decOpcionCompra;
                                    mdl.intParamCotID = responsePC.intParamCotID;
                                }
                                if (responsePOC) {
                                    if ($scope.cotizacion.intMonedaID == 1) {//pesos
                                        $scope.OCAPDolares = responsePOC.decValorPesos;
                                    }
                                    if ($scope.cotizacion.intMonedaID == 2) {//dolares
                                        $scope.OCAPDolares = responsePOC.decValorDorales;
                                    }
                                }
                                var mdlEjFin = agregarEjercicioFin(mdl.Plazo, mdl.intTipoCotizacionID);
                                mdl.tbl_DET_EjercicioFinanciero.push(mdlEjFin);
                                $scope.TipoVentas.push(mdl);
                            }
                            catch (Exce) {
                                console.log("Error al obtener el parametros de cotizacion: " + Exce.message);
                            }
                        });
                    });
                }
                else {
                    //Borrar un objeto concreto del array:
                    for (var i = 0; i < $scope.TipoVentas.length; i++) {
                        if ($scope.TipoVentas[i].ID === Tipo) {
                            $scope.TipoVentas.splice(i, 1);
                        }
                    }
                }
            }
            catch (Exce) {
                console.log("Error al agregar el tipo de venta: " + Exce.message);
            }
        };

        $scope.VerEvento = function (ev, item) {
            try {
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
            catch (Exce) {
                console.log("Error al ver la propuesta económica: " + Exce.message);
            }
        };

        function agregarEjercicioFin(Plazo, tipoventa) {
            limpiarEF();
            //Calcular Ejercicio Financiero
            $scope.ejercicioFinancieroItem.vchDetalleOpe = $scope.cotizacion.vchDetalleOperacion;
            $scope.ejercicioFinancieroItem.decPrecioTotal = $scope.ejercicioTotal.Total;
            if ($scope.cotizacion.decActicipoAdi != null) {
                $scope.ejercicioFinancieroItem.decAnticipoOp = $scope.cotizacion.decActicipoAdi;
                $scope.ejercicioFinancieroItem.decAnticipoAdi = $scope.cotizacion.decActicipoAdi;
            }
            try {
                if (Plazo > 0) {
                    var opCAP = Plazo;
                    $scope.ejercicioFinancieroItem.intPlazoMeses = opCAP;
                    if (tipoventa == 2) {// Arendamiento puro
                        if (Plazo > 6) {
                            $scope.ejercicioFinancieroItem.decPagoMensualSeguro = Pago($scope.TasaFinSeguro / 12, opCAP, $scope.ejercicioTotal.Total * $scope.FactorSeguro * (opCAP / 12));
                            $scope.ejercicioFinancieroItem.decUsado = $scope.ejercicioTotal.Total * $scope.OpcionCompaAP;
                            $scope.ejercicioFinancieroItem.decRentaInicial = $scope.cotizacion.decActicipoAdi;
                            //$scope.ejercicioFinancieroItem.decAnticipoTot = $scope.ejercicioFinancieroItem.decAnticipoFijo + $scope.cotizacion.decActicipoAdi;
                            $scope.ejercicioFinancieroItem.decRentaMensual = PagoUsado($scope.TasaAP / 12, opCAP, ($scope.ejercicioTotal.Total - $scope.ejercicioFinancieroItem.decRentaInicial - $scope.ejercicioFinancieroItem.decUsado), $scope.ejercicioFinancieroItem.decUsado);
                            $scope.ejercicioFinancieroItem.decComAper = ($scope.ejercicioTotal.Total - $scope.ejercicioFinancieroItem.decRentaInicial) * $scope.ComAperturaAP;
                            $scope.ejercicioFinancieroItem.decDepositoGarantia = $scope.ejercicioFinancieroItem.decRentaMensual * 2.5;
                            $scope.ejercicioFinancieroItem.decPagoIniTotal = $scope.ejercicioFinancieroItem.decRentaInicial + $scope.ejercicioFinancieroItem.decDepositoGarantia;
                        }
                        else {
                            $scope.ejercicioFinancieroItem.decUsado = 0;
                            $scope.ejercicioFinancieroItem.decPagoMensualSeguro = 0;
                            $scope.ejercicioFinancieroItem.decRentaMensual = 0;
                            $scope.ejercicioFinancieroItem.RentaInicial = 0;
                            $scope.ejercicioFinancieroItem.decComAper = 0;
                            $scope.ejercicioFinancieroItem.decDepositoGarantia = 0;
                            $scope.ejercicioFinancieroItem.decPagoIniTotal = 0;
                        }
                        //if (Plazo >= 6) {
                        //    $scope.ejercicioFinancieroItem.decAnticipoFijo = $scope.ejercicioTotal.Total * 0.3;
                        //    $scope.ejercicioFinancieroItem.decAnticipoTot = $scope.ejercicioFinancieroItem.decAnticipoFijo + $scope.cotizacion.decActicipoAdi;
                        //}
                        //else {
                        //    $scope.ejercicioFinancieroItem.decAnticipoFijo = 0;
                        //    $scope.ejercicioFinancieroItem.decAnticipoTot = 0;
                        //}
                    }
                    if (tipoventa == 3) { // Financiamiento
                        if (Plazo >= 4) {
                            $scope.ejercicioFinancieroItem.decAnticipoFijo = $scope.ejercicioTotal.Total * 0.3;
                        }
                        else {
                            $scope.ejercicioFinancieroItem.decAnticipoFijo = 0;
                        }
                        $scope.ejercicioFinancieroItem.decAnticipoTot = $scope.ejercicioFinancieroItem.decAnticipoFijo + $scope.cotizacion.decActicipoAdi;
                        var capital = $scope.ejercicioTotal.Total - $scope.ejercicioFinancieroItem.decAnticipoTot;
                        if (Plazo >= 4) {

                            $scope.ejercicioFinancieroItem.decPagoMensualEq = Pago($scope.TasaFin / 12, opCAP, capital);
                        }
                        else {
                            $scope.ejercicioFinancieroItem.decPagoMensualEq = VF($scope.TasaFin / 12, opCAP, capital);
                        }
                        if (Plazo > 4) {
                            $scope.ejercicioFinancieroItem.decPagoMensualSeguro = Pago($scope.TasaFinSeguro / 12, opCAP, $scope.ejercicioTotal.Total * $scope.FactorSeguro * (opCAP / 12));
                        }
                        else {
                            if (Plazo == 4) {
                                $scope.ejercicioFinancieroItem.decPagoMensualSeguro = VF($scope.TasaFinSeguro / 12, opCAP, $scope.ejercicioTotal.Total * $scope.FactorSeguro * (opCAP / 12));
                            }
                            else {
                                $scope.ejercicioFinancieroItem.decPagoMensualSeguro = 0;
                            }
                        }
                    }
                }
                else {
                    $scope.ejercicioFinancieroItem.decUsado = 0;
                    $scope.ejercicioFinancieroItem.decPagoMensualSeguro = 0;
                    $scope.ejercicioFinancieroItem.decRentaMensual = 0;
                    $scope.ejercicioFinancieroItem.RentaInicial = 0;
                    $scope.ejercicioFinancieroItem.decComAper = 0;
                    $scope.ejercicioFinancieroItem.decDepositoGarantia = 0;
                    $scope.ejercicioFinancieroItem.decPagoIniTotal = 0;
                    $scope.ejercicioFinancieroItem.decAnticipoFijo = 0;
                    $scope.ejercicioFinancieroItem.decPagoMensualSeguro = 0;
                }
                return $scope.ejercicioFinancieroItem;
            }
            catch (exce) {
                console.log("Existe un error en load: " + exce.Message);
            }
        }

        function agregarEjercicioFinSimple(Plazo, tipoventa, ejercicioItem) {
            limpiarEFSimple(ejercicioItem.decTasaFin, ejercicioItem.decTasaAP, ejercicioItem.decTasaAF, ejercicioItem.decTasaFinSeguro, ejercicioItem.decComAperturaAP, ejercicioItem.decOpcionCompra, ejercicioItem.decFactorSeguro);
            //Calcular Ejercicio Financiero
            $scope.ejercicioFinancieroItem.vchDetalleOpe = $scope.cotizacion.vchDetalleOperacion;
            $scope.ejercicioFinancieroItem.decPrecioTotal = $scope.ejercicioTotal.Total;
            if ($scope.cotizacion.decActicipoAdi != null) {
                $scope.ejercicioFinancieroItem.decAnticipoOp = $scope.cotizacion.decActicipoAdi;
                $scope.ejercicioFinancieroItem.decAnticipoAdi = $scope.cotizacion.decActicipoAdi;
            }
            try {
                if (Plazo > 0) {
                    var opCAP = Plazo;
                    $scope.ejercicioFinancieroItem.intPlazoMeses = opCAP;
                    if (tipoventa == 2) {// Arendamiento puro
                        if (Plazo > 6) {
                            $scope.ejercicioFinancieroItem.decPagoMensualSeguro = Pago(ejercicioItem.decTasaFinSeguro / 12, opCAP, $scope.ejercicioTotal.Total * ejercicioItem.decFactorSeguro * (opCAP / 12));
                            $scope.ejercicioFinancieroItem.decUsado = $scope.ejercicioTotal.Total * ejercicioItem.decOpcionCompra;
                            $scope.ejercicioFinancieroItem.decRentaInicial = $scope.cotizacion.decActicipoAdi;
                            //$scope.ejercicioFinancieroItem.decAnticipoTot = $scope.ejercicioFinancieroItem.decAnticipoFijo + $scope.cotizacion.decActicipoAdi;
                            $scope.ejercicioFinancieroItem.decRentaMensual = PagoUsado(ejercicioItem.decTasaAP / 12, opCAP, ($scope.ejercicioTotal.Total - $scope.ejercicioFinancieroItem.decRentaInicial - $scope.ejercicioFinancieroItem.decUsado), $scope.ejercicioFinancieroItem.decUsado);
                            $scope.ejercicioFinancieroItem.decComAper = ($scope.ejercicioTotal.Total - $scope.ejercicioFinancieroItem.decRentaInicial) * ejercicioItem.decComAperturaAP;
                            $scope.ejercicioFinancieroItem.decDepositoGarantia = $scope.ejercicioFinancieroItem.decRentaMensual * 2.5;
                            $scope.ejercicioFinancieroItem.decPagoIniTotal = $scope.ejercicioFinancieroItem.decRentaInicial + $scope.ejercicioFinancieroItem.decDepositoGarantia;
                        }
                        else {
                            $scope.ejercicioFinancieroItem.decUsado = 0;
                            $scope.ejercicioFinancieroItem.decPagoMensualSeguro = 0;
                            $scope.ejercicioFinancieroItem.decRentaMensual = 0;
                            $scope.ejercicioFinancieroItem.RentaInicial = 0;
                            $scope.ejercicioFinancieroItem.decComAper = 0;
                            $scope.ejercicioFinancieroItem.decDepositoGarantia = 0;
                            $scope.ejercicioFinancieroItem.decPagoIniTotal = 0;
                        }
                        //if (Plazo >= 6) {
                        //    $scope.ejercicioFinancieroItem.decAnticipoFijo = $scope.ejercicioTotal.Total * 0.3;
                        //    $scope.ejercicioFinancieroItem.decAnticipoTot = $scope.ejercicioFinancieroItem.decAnticipoFijo + $scope.cotizacion.decActicipoAdi;
                        //}
                        //else {
                        //    $scope.ejercicioFinancieroItem.decAnticipoFijo = 0;
                        //    $scope.ejercicioFinancieroItem.decAnticipoTot = 0;
                        //}
                    }
                    if (tipoventa == 3) { // Financiamiento
                        if (Plazo >= 4) {
                            $scope.ejercicioFinancieroItem.decAnticipoFijo = $scope.ejercicioTotal.Total * 0.3;
                        }
                        else {
                            $scope.ejercicioFinancieroItem.decAnticipoFijo = 0;
                        }
                        $scope.ejercicioFinancieroItem.decAnticipoTot = $scope.ejercicioFinancieroItem.decAnticipoFijo + $scope.cotizacion.decActicipoAdi;
                        var capital = $scope.ejercicioTotal.Total - $scope.ejercicioFinancieroItem.decAnticipoTot;
                        if (Plazo >= 4) {

                            $scope.ejercicioFinancieroItem.decPagoMensualEq = Pago(ejercicioItem.decTasaFin / 12, opCAP, capital);
                        }
                        else {
                            $scope.ejercicioFinancieroItem.decPagoMensualEq = VF(ejercicioItem.decTasaFin / 12, opCAP, capital);
                        }
                        if (Plazo > 4) {
                            $scope.ejercicioFinancieroItem.decPagoMensualSeguro = Pago(ejercicioItem.decTasaFinSeguro / 12, opCAP, $scope.ejercicioTotal.Total * ejercicioItem.decFactorSeguro * (opCAP / 12));
                        }
                        else {
                            if (Plazo == 4) {
                                $scope.ejercicioFinancieroItem.decPagoMensualSeguro = VF(ejercicioItem.decTasaFinSeguro / 12, opCAP, $scope.ejercicioTotal.Total * ejercicioItem.decFactorSeguro * (opCAP / 12));
                            }
                            else {
                                $scope.ejercicioFinancieroItem.decPagoMensualSeguro = 0;
                            }
                        }
                    }
                }
                else {
                    $scope.ejercicioFinancieroItem.decUsado = 0;
                    $scope.ejercicioFinancieroItem.decPagoMensualSeguro = 0;
                    $scope.ejercicioFinancieroItem.decRentaMensual = 0;
                    $scope.ejercicioFinancieroItem.RentaInicial = 0;
                    $scope.ejercicioFinancieroItem.decComAper = 0;
                    $scope.ejercicioFinancieroItem.decDepositoGarantia = 0;
                    $scope.ejercicioFinancieroItem.decPagoIniTotal = 0;
                    $scope.ejercicioFinancieroItem.decAnticipoFijo = 0;
                    $scope.ejercicioFinancieroItem.decPagoMensualSeguro = 0;
                }
                return $scope.ejercicioFinancieroItem;
            }
            catch (exce) {
                console.log("Existe un error en load: " + exce.Message);
            }
        }

        function limpiarEF() {
            $scope.ejercicioFinancieroItem = {
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
        }

        function limpiarEFSimple(TasaFin, TasaAP, TasaAF, TasaFinSeguro, ComAperturaAP, OpcionCompaAP, FactorSeguro) {
            $scope.ejercicioFinancieroItem = {
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
                decTasaFin: TasaFin,
                decTasaAP: TasaAP,
                decTasaAF: TasaAF,
                decTasaFinSeguro: TasaFinSeguro,
                decFactorSeguro: FactorSeguro,
                decComAperturaAP: ComAperturaAP,
                decOpcionCompra: OpcionCompaAP,
                decAnticipoAdi: 0,
                vchDetalleOpe: ''
            };
        }

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

        $scope.clearProducts = function (ev) {
            try {
                $scope.carrito = [];
                $scope.CalcularCosto();
            }
            catch (Exce) {
                console.log("Existe un error en clearProducts: " + Exce.message);
            }
        };

    }]).directive('format', ['$filter', function ($filter) {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$formatters.unshift(function (a) {
                    return $filter(attrs.format)(ctrl.$modelValue)
                });

                elem.bind('blur', function (event) {
                    var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                    elem.val($filter(attrs.format)(plainNumber));
                });
            }
        };
    }]);