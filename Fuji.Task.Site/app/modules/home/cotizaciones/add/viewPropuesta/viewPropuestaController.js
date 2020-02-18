angular.module('Task').controller('viewPropuestaController', ['$scope', '$rootScope', '$mdDialog', 'cotizacionesServices', 'cotizacion', 'tipoventa', 'Total',
    function ($scope, $rootScope, $mdDialog, cotizacionesServices, cotizacion, tipoventa, Total) {
        $scope.loading = false;
        $scope.cotizacion = cotizacion;
        $scope.tipoventa = tipoventa;
        $scope.TasaFin = .2325;
        $scope.TasaAP = .2325;
        $scope.TasaAF = .2325;
        $scope.TasaFinSeguro = .2325;
        $scope.FactorSeguro = .0095;
        $scope.ComAperturaAP = .01;
        $scope.OpcionCompaAP = .3;
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
        $scope.ejercicioTotal = Total;
        $scope.OCAPDolares = 0.30;
        $scope.ParamCot = null;

        function load() {
            $scope.loading = true;
            var request = {
                token: $rootScope.Globals.CurrentUserCot.Token,
                intPlazoID: $scope.tipoventa.intPlazoID
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
                        }
                        if (responsePOC) {
                            if ($scope.cotizacion.intMonedaID == 1) {//pesos
                                $scope.OCAPDolares = responsePOC.decValorPesos;
                            }
                            if ($scope.cotizacion.intMonedaID == 2) {//dolares
                                $scope.OCAPDolares = responsePOC.decValorDorales;
                            }
                        }

                        //Calcular Ejercicio Financiero
                        $scope.ejercicioFinanciero.decPrecioTotal = $scope.ejercicioTotal.Total;
                        if ($scope.cotizacion.decActicipoAdi != null) {
                            $scope.ejercicioFinanciero.decAnticipoOp = $scope.cotizacion.decActicipoAdi;
                            $scope.ejercicioFinanciero.decAnticipoAdi = $scope.cotizacion.decActicipoAdi;
                        }
                        try {
                            if ($scope.tipoventa.Plazo > 0) {
                                var opCAP = tipoventa.Plazo;
                                $scope.ejercicioFinanciero.intPlazoMeses = opCAP;
                                if ($scope.tipoventa.Arren) {// Arendamiento puro
                                    if ($scope.tipoventa.Plazo > 6) {
                                        $scope.ejercicioFinanciero.decPagoMensualSeguro = Pago($scope.TasaFinSeguro / 12, opCAP, $scope.ejercicioTotal.Total * $scope.FactorSeguro * (opCAP / 12));
                                        $scope.ejercicioFinanciero.decUsado = $scope.ejercicioTotal.Total * $scope.OpcionCompaAP;
                                        $scope.ejercicioFinanciero.decRentaInicial = $scope.cotizacion.decActicipoAdi;
                                        $scope.ejercicioFinanciero.decRentaMensual = PagoUsado($scope.TasaAP / 12, opCAP, ($scope.ejercicioTotal.Total - $scope.ejercicioFinanciero.decRentaInicial - $scope.ejercicioFinanciero.decUsado), $scope.ejercicioFinanciero.decUsado);
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
                                if ($scope.tipoventa.Fin) { // Financiamiento
                                    if ($scope.tipoventa.Plazo >= 4) {
                                        $scope.ejercicioFinanciero.decAnticipoFijo = $scope.ejercicioTotal.Total * 0.3;
                                    }
                                    else {
                                        $scope.ejercicioFinanciero.decAnticipoFijo = 0;
                                    }
                                    $scope.ejercicioFinanciero.decAnticipoTot = $scope.ejercicioFinanciero.decAnticipoFijo + $scope.cotizacion.decActicipoAdi;
                                    var capital = $scope.ejercicioTotal.Total - $scope.ejercicioFinanciero.decAnticipoTot;
                                    if ($scope.tipoventa.Plazo >= 4) {

                                        $scope.ejercicioFinanciero.decPagoMensualEq = Pago($scope.TasaFin / 12, opCAP, capital);
                                    }
                                    else {
                                        $scope.ejercicioFinanciero.decPagoMensualEq = VF($scope.TasaFin / 12, opCAP, capital);
                                    }
                                    if ($scope.tipoventa.Plazo > 4) {
                                        $scope.ejercicioFinanciero.decPagoMensualSeguro = Pago($scope.TasaFinSeguro / 12, opCAP, $scope.ejercicioTotal.Total * $scope.FactorSeguro * (opCAP / 12));
                                    }
                                    else {
                                        if ($scope.tipoventa.Plazo == 4) {
                                            $scope.ejercicioFinanciero.decPagoMensualSeguro = VF($scope.TasaFinSeguro / 12, opCAP, $scope.ejercicioTotal.Total * $scope.FactorSeguro * (opCAP / 12));
                                        }
                                        else {
                                            $scope.ejercicioFinanciero.decPagoMensualSeguro = 0;
                                        }
                                    }
                                }
                            }
                            else {
                                $scope.ejercicioFinanciero.decUsado = 0;
                                $scope.ejercicioFinanciero.decPagoMensualSeguro = 0;
                                $scope.ejercicioFinanciero.decRentaMensual = 0;
                                $scope.ejercicioFinanciero.RentaInicial = 0;
                                $scope.ejercicioFinanciero.decComAper = 0;
                                $scope.ejercicioFinanciero.decDepositoGarantia = 0;
                                $scope.ejercicioFinanciero.decPagoIniTotal = 0;
                                $scope.ejercicioFinanciero.decAnticipoFijo = 0;
                                $scope.ejercicioFinanciero.decPagoMensualSeguro = 0;
                            }
                        }
                        catch (exce) {
                            console.log("Existe un error en load: " + exce.Message);
                        }
                        $scope.loading = false;
                    }
                    catch (Exce) {
                        console.log("Error al obtener el parametros de cotizacion: " + Exce.message);
                        $scope.loading = false;
                    }
                });
            });
        }
        load();

        $scope.cancel = function () {
            $mdDialog.cancel();
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
    }]);