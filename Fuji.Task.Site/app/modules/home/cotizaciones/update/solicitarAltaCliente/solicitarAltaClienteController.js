angular.module('Task').controller('solicitarAltaClienteController', ['$scope', '$rootScope', '$mdDialog', '$location', 'cotizacionesServices', 'cliente', 'Documentos','intCotizacionID',
    function ($scope, $rootScope, $mdDialog, $location, cotizacionesServices, cliente, Documentos, intCotizacionID) {
        $scope.loading = false;
        $scope.cliente = cliente;
        $scope.Documentos = Documentos == null ? [] : Documentos;
        $scope.intCotizacionID = intCotizacionID;

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.abrirMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
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
                $mdDialog.show(alert);
            });
        };

        $scope.VerDetalleCliente = function (ev, doc) {
            try {
                $scope.loading = true;
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    intClienteID: $scope.cliente.intClienteID,
                    intCotizacionID: $scope.intCotizacionID,
                    UserId: $rootScope.Globals.CurrentUserCot.intUsuarioID
                };

                cotizacionesServices.GeneraDetalleCliente(request, function (response) {
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
                    intCotizacionID: $scope.intCotizacionID,
                    UserId: $rootScope.Globals.CurrentUserCot.intUsuarioID
                };
                cotizacionesServices.SolicitarAltaCliente(request, function (response) {
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

    }]);