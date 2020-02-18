angular.module('TaskMDL').controller('cargarDocumentosController', ['$scope', '$rootScope', '$mdDialog', '$location', 'clientesServices', 'cliente',
    function ($scope, $rootScope, $mdDialog, $location, clientesServices, cliente) {
        $scope.loading = false;
        $scope.cliente = cliente;
        $scope.Valido = true;

        $scope.Documentos = [];

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
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Cliente: $scope.cliente
                };
                clientesServices.ObtenerDocumentosCargarCliente(request, function (responseDocs) {
                    $scope.Documentos = responseDocs;
                    //    cotizacionesServices.ObtenerDetalleCliente(request, function (response) {
                    //        if (response.Success) {
                    //            $scope.Cliente = response.cliente;
                    //        }
                    if ($scope.cliente.vchClienteID == "" || $scope.cliente.vchClienteID == null)
                        for (var i = 0; i < $scope.Documentos.length; i++) {
                            if (!$scope.Documentos[i].bitCompleto)
                                $scope.Valido = false;
                        }
                    $scope.loading = false;
                });
                //});
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Existe un error: " + Exce.Message);
            }
        }
        load();

        $scope.abrirMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        $scope.CargarDocumento = function (ev, doc) {
            var mdlClienteDoc = {
                Documento: doc,
                Cliente: $scope.cliente
            };
            $mdDialog.show({
                controller: 'addDocCController',
                templateUrl: 'app/modules/home/admin/clientes/addDoc/addDocCView.html',
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

        $scope.VerDetalleCliente = function (ev, doc) {
            try {
                $scope.loading = true;
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    intClienteID: $scope.cliente.intClienteID,
                    intCotizacionID: 0,
                    UserId: $rootScope.Globals.CurrentUserCot.intUsuarioID
                };

                clientesServices.GeneraDetalleCliente(request, function (response) {
                    $scope.loading = false;
                    if (response.Success) {
                        $mdDialog.show({
                            controller: 'detalleClienteController',
                            templateUrl: 'app/modules/home/cotizaciones/update/detalleCliente/detalleClienteView.html',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            clickOutsideToClose: false,
                            fullscreen: true,
                            skipHide: true,
                            locals: {
                                Detalle: response
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
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Error al ver el detalle del cliente: " + Exce.Message);
            }
        };

        $scope.AltaCliente = function (ev) {
            try {
                $scope.loading = true;
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    intClienteID: $scope.cliente.intClienteID,
                    intCotizacionID: 0,
                    UserId: $rootScope.Globals.CurrentUserCot.intUsuarioID
                };
                clientesServices.SolicitarAltaCliente(request, function (response) {
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
                    $scope.loading = false;
                });
            }
            catch (Exce) {
                $scope.loading = false;
                console.log("Error al solicitar el alta de cliente:" + Exce.Message);
            }
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
    }]);