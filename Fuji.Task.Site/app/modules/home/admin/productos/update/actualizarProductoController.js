angular.module('TaskMDL').controller('actualizarProductoController', ['$scope', '$rootScope', '$mdDialog', 'productosServices', 'producto',
    function ($scope, $rootScope, $mdDialog, productosServices, producto) {
        $scope.loading = false;
        $scope.producto = producto;
        $scope.lineas = [];
        $scope.tiposP = [];
        $scope.unidades = [];
        $scope.CambiarImagen = false;
        $scope.FileUID = false;
        $scope.File = false;
        $scope.FileOtro = false;
        $scope.FileImagen = false;
        $scope.LabelPdf = { color: 'red' };
        $scope.LabelOtroPdf = { color: 'red' };
        $scope.LabelImagen = { color: 'red' };
        $scope.bitOtroFolleto = false;

        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        function load() {
            $scope.loading = true;
            var request = {
                id: 0,
                token: $rootScope.Globals.CurrentUserCot.Token
            };
            productosServices.ObtenerLineaProd(request, function (responseLinea) {
                productosServices.ObtenerTipoProductos(request, function (responseTipProd) {
                    productosServices.ObtenerTipoUnidades(request, function (responseUnidades) {
                        $scope.lineas = responseLinea;
                        $scope.tiposP = responseTipProd;
                        $scope.unidades = responseUnidades;
                        if ($scope.producto.vbImagen == null) {
                            var request = {
                                token: $rootScope.Globals.CurrentUserCot.Token,
                                Producto: $scope.producto
                            };
                            productosServices.ObtenerDetalleProducto(request, function (response) {
                                $scope.loading = false;
                                if (response.Success) {
                                    $scope.producto = response.Producto;
                                }
                                else {
                                    var alert = $mdDialog.alert({
                                        title: 'Mensaje del sistema',
                                        textContent: response.Message,
                                        ok: 'Aceptar',
                                        skipHide: true
                                    });
                                    $mdDialog.show(alert);
                                }
                            });
                        }
                    });
                });
            });
        }
        load();

        $scope.ActualizarProducto = function (producto, ev) {
            $scope.loading = true;
            try {
                //if (($scope.CambiarImagen && $scope.FileUID) || !$scope.CambiarImagen) {
                var data = new FormData();
                data.append('token', $rootScope.Globals.CurrentUserCot.Token);
                data.append('intUserSys', $rootScope.Globals.CurrentUserCot.intUsuarioID);
                data.append('vchNombreProducto', producto.vchNombreProducto);
                data.append('intLineaProdID', producto.intLineaProdID);
                data.append('intTipoProductoID', producto.intTipoProductoID);
                data.append('intProductoID', producto.intProductoID);
                data.append('vchDescripcionProd', producto.vchDescripcionProd);
                data.append('bitMostrar', producto.bitMostrar);
                data.append('bitBusqueda', producto.bitBusqueda);

                if (!producto.bitMostrar) {
                    if (producto.vchCodigoProd != null && producto.vchCodigoProd != "")
                        data.append('vchCodigoProd', producto.vchCodigoProd);
                    if (producto.decCostoUnitario != null && producto.decCostoUnitario != "")
                        data.append('decCostoUnitario', producto.decCostoUnitario);
                    if (producto.intUnidadID != null && producto.intUnidadID != "")
                        data.append('intUnidadID', producto.intUnidadID);
                    if (producto.intCantidad != null && producto.intCantidad != "")
                        data.append('intCantidad', producto.intCantidad);
                }
                
                if ($scope.FileImagen) {
                    if ($scope.CambiarImagen)
                        data.append('ArchivoUID', $scope.ImagenProd);
                }
                if ($scope.File) {
                    if ($scope.CambiarPDF)
                        data.append('FileFolleto', $scope.Folleto);
                    data.append('bitFolleto', producto.bitFolleto);
                }
                if ($scope.bitOtroFolleto) {
                    if ($scope.FolletoOtro)
                        data.append('FolletoOtro', $scope.FolletoOtro);
                }
                productosServices.ActualizarProducto(data, function (response) {
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
            catch (Exce) {
                $scope.loading = false;
                console.log("Error: " + Exce.Message);
            }
        };

        $scope.querySearch = function (query) {
            return query ? $scope.managers.filter(createFilterFor(query)) : $scope.managers;
        };

        $scope.uploadFolletoUpd = function (event) {
            $scope.$apply(function () {
                if (event.target.files) {
                    $scope.LabelPdf.color = '#00695c';
                    $scope.Folleto = event.target.files[0];
                    $scope.File = true;
                } else {
                    $scope.LabelPdf.color = 'red';
                    $scope.File = false;
                }
            });
        };

        $scope.uploadImagenProdUpd = function (event) {
            $scope.$apply(function () {
                if (event.target.files) {
                    $scope.LabelImagen.color = '#00695c';
                    $scope.ImagenProd = event.target.files[0];
                    $scope.FileImagen = true;
                } else {
                    $scope.LabelImagen.color = 'red';
                    $scope.FileImagen = false;
                }
            });
        };

        $scope.uploadFolletoOtro = function (event) {
            $scope.$apply(function () {
                if (event.target.files) {
                    $scope.LabelOtroPdf.color = '#00695c';
                    $scope.FolletoOtro = event.target.files[0];
                    $scope.FileOtro = true;
                } else {
                    $scope.LabelOtroPdf.color = 'red';
                    $scope.FileOtro = false;
                }
            });
        };

        $scope.changeFolleto = function (event) {
            $scope.CambiarPDF = $scope.producto.bitFolleto;
            if (!$scope.CambiarPDF) {
                $scope.LabelPdf.color = 'red';
                $scope.File = false;
                $scope.Folleto = null;
            }
        };

    }]).directive('customOnChange', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('change', scope.$eval(attrs.customOnChange));
            }
        };
    });