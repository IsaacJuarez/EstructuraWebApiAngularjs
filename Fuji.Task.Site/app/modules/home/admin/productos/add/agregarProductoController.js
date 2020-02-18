angular.module('TaskMDL').controller('agregarProductoController', ['$scope', '$rootScope', '$mdDialog', 'productosServices',
    function ($scope, $rootScope, $mdDialog, productosServices) {
        $scope.loading = false;
        $scope.existe = false;
        $scope.lineas = [];
        $scope.tiposP = [];
        $scope.unidades = [];
        $scope.File = false;
        $scope.FileOtro = false;
        $scope.FileImagen = false;
        $scope.LabelPdf = { color: 'red' };
        $scope.LabelOtroPdf = { color: 'red' };
        $scope.LabelImagen = { color: 'red' };
        $scope.bitFolleto = false;
        //$scope.bitFormarPaquete = false;

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
                    id: 0,
                    token: $rootScope.Globals.CurrentUserCot.Token
                };
                productosServices.ObtenerLineaProd(request, function (responseLinea) {
                    productosServices.ObtenerTipoProductos(request, function (responseTipProd) {
                        productosServices.ObtenerTipoUnidades(request, function (responseUnidades) {
                            $scope.loading = false;
                            $scope.lineas = responseLinea;
                            $scope.tiposP = responseTipProd;
                            $scope.unidades = responseUnidades;
                        });
                    });
                });
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Existe un error: " + Exce.Message);
            }
        }
        load();

        $scope.AgregarProducto = function (producto, ev) {
            $scope.loading = true;
            try {
                //if ($scope.FileUID) {
                var data = new FormData();
                data.append('token', $rootScope.Globals.CurrentUserCot.Token);
                data.append('intUserSys', $rootScope.Globals.CurrentUserCot.intUsuarioID);
                data.append('vchNombreProducto', producto.vchNombreProducto);
                data.append('intLineaProdID', producto.intLineaProdID);
                data.append('intTipoProductoID', producto.intTipoProductoID);
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
                    if ($scope.Folleto)
                        data.append('FileFolleto', $scope.Folleto);
                    data.append('bitFolleto', producto.bitFolleto);
                }
                if ($scope.FileOtro) {
                    if ($scope.FolletoOtro)
                        data.append('FolletoOtro', $scope.FolletoOtro);
                }
                
                productosServices.AgregarProducto(data, function (response) {
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
                //}
                //else {
                //    $scope.loading = false;
                //    var alert2 = $mdDialog.alert({
                //        title: 'Advertencia',
                //        textContent: "Favor de cargar una imagen en formato png",
                //        ok: 'Aceptar',
                //        skipHide: true
                //    });
                //    $mdDialog.show(alert2);
                //}
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Error: " + Exce.Message);
            }
        };

        $scope.uploadFolleto = function (event) {
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

        $scope.uploadImagenProd = function (event) {
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
    }]);