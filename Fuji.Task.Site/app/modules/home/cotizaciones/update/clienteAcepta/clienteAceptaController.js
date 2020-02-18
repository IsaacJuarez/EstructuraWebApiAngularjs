angular.module('Task').controller('clienteAceptaController', ['$scope', '$rootScope', '$mdDialog', '$location', 'cotizacionesServices', 'cotizacion','TipoVenta',
    function ($scope, $rootScope, $mdDialog, $location, cotizacionesServices, cotizacion, TipoVenta) {
        $scope.loading = false;
        $scope.cotizacion = cotizacion;
        $scope.TipoVenta = TipoVenta == null ? [] : TipoVenta;
        $scope.intOpcVentaID = 0;
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        function load() {
            $scope.loading = true;
            try {
                if ($scope.TipoVenta.length == 0) {
                    var request = {
                        token: $rootScope.Globals.CurrentUserCot.Token,
                        Usuario: $rootScope.Globals.CurrentUserCot,
                        Cotizacion: $scope.cotizacion
                    };
                    cotizacionesServices.ObtenerCotizacionDetalle(request, function (responseCot) {
                        if (responseCot.Success != null) {
                            $scope.cotizacion = responseCot.cotizacion;
                            if ($scope.cotizacion.TipoVenta)
                                cargaTipoVenta($scope.cotizacion.TipoVenta);
                        }
                        $scope.loading = false;
                    });
                }
                else {
                    $scope.loading = false;
                }
            }
            catch (Exce) {
                console.log("Error al cargar: " + Exce.message);
                $scope.loading = false;
            }
        }
        load();

        $scope.Seleccion = function (tipo) {
            try {
                limpiar();
                tipo.Seleccion = true;
                $scope.intOpcVentaID = tipo.intOpcVentaID;
            }
            catch (exce) {
                console.log("Error: " + exce.message);
            }
        };

        function limpiar() {
            try {
                for (var i = 0; i < $scope.TipoVenta.length; i++) {
                    $scope.TipoVenta[i].Seleccion = false;
                }
            }
            catch (Exce) {
                console.log("Existe un error en limpiar: " + Exce.message);
            }
        }

        function cargaTipoVenta(objeto) {
            try {
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
                        tbl_DET_EjercicioFinanciero: []
                    };
                    switch (objeto[i].intTipoCotizacionID) {
                        case 1://Contado
                            mdl.ID = 1;
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
                    mdl.tbl_DET_EjercicioFinanciero = objeto[i].tbl_DET_EjercicioFinanciero;
                    $scope.TipoVenta.push(mdl);
                }
            }
            catch (Exce) {
                console.log("Error en cargaTipoVenta: " + Exce.message);
            }
        }

        $scope.AceptacionCliente = function (ev, cotizacion) {
            try {
                $scope.loading = true;
                var Request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    intCotizacionID: cotizacion.intCotizacionID,
                    intOpcVentaID: $scope.intOpcVentaID,
                    UserID: $rootScope.Globals.CurrentUserCot.intUsuarioID
                };
                cotizacionesServices.ClienteAceptaCotizacion(Request, function (response) {
                    $scope.loading = false;
                    if (response.Success)
                        $mdDialog.hide(response);
                    else {
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
            catch (exce) {
                console.log("Error: " + exce.message);
            }
        };
    }]);