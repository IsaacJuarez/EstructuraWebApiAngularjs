angular.module('Task').controller('addDocController', ['$scope', '$rootScope', '$mdDialog', 'cotizacionesServices','mdlClienteDoc',
    function ($scope, $rootScope, $mdDialog, cotizacionesServices, mdlClienteDoc) {
        $scope.loading = false;
        $scope.mdlClienteDoc = mdlClienteDoc;

        $scope.Cliente = mdlClienteDoc.Cliente;
        $scope.Documento = mdlClienteDoc.Documento;
        $scope.FileImagen = false;
        $scope.LabelImagen = { color: 'red' };

        function load() {
            
        }
        load();

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

        $scope.uploadImagenProdXLS = function (event) {
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

        $scope.uploadImagenProdXLS2 = function (event) {
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

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.CargarDoc = function (doc, ev) {
            $scope.loading = true;
            try {
                //if ($scope.FileUID) {
                var data = new FormData();
                data.append('token', $rootScope.Globals.CurrentUserCot.Token);
                data.append('intUsuarioID', $rootScope.Globals.CurrentUserCot.intUsuarioID);
                data.append('intClienteID', $scope.Cliente.intClienteID);
                data.append('intDocumentoID', doc.intDocClienteID);
                data.append('FileDocumento', $scope.ImagenProd);
                data.append('FileName', $scope.ImagenProd.name);
                data.append('intTipoClienteID', $scope.Cliente.intTipoClienteID);

                cotizacionesServices.CargarDoc(data, function (response) {
                    $scope.loading = false;
                    if (doc.intDocClienteID == 9 || doc.intDocClienteID == 10) {
                        if (response.client != null) {
                            $mdDialog.show({
                                controller: 'validacionClienteCController',
                                templateUrl: 'app/modules/home/cotizaciones/update/validacionDatosCliente/validacionClienteCView.html',
                                parent: angular.element(document.body),
                                targetEvent: ev,
                                clickOutsideToClose: false,
                                fullscreen: true,
                                skipHide: true,
                                locals: {
                                    client: response.client
                                }
                            }).then(function (response) {
                                $mdDialog.hide(response);
                            });
                        }
                        else {
                            var alerta = $mdDialog.alert({
                                title: 'Advertencia',
                                textContent: 'Verificar la información: ' + response.Message,
                                ok: 'Aceptar',
                                skipHide: true
                            });
                            $mdDialog.show(alerta);
                        }
                    }
                    else {
                        if (response.Success) {
                            response.Message = "Cambios correctos.";
                            $mdDialog.hide(response);
                        }
                        else {
                            var alert = $mdDialog.alert({
                                title: 'Advertencia',
                                textContent: response.Message,
                                ok: 'Aceptar',
                                skipHide: true
                            });
                            $mdDialog.show(alert);
                        }
                    }
                });
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Error: " + Exce.Message);
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