angular.module('TaskMDL').controller('homeController', ['$scope', '$rootScope', '$mdDialog', '$location', 'homeServices', '$cookieStore',
    function ($scope, $rootScope, $mdDialog, $location, homeServices, $cookieStore) {
        $scope.user = $rootScope.Globals.CurrentUserCot;
        $scope.loading = false;
        $scope.eventos = [];
        $scope.avisos = [];
        $scope.showAvisos = false;
        $scope.TipoMensaje = 'No leídos';
        $scope.MenuCot = false;
        $scope.menuUser = false;
        $scope.MenuClient = false;
        $scope.Menuproduct = false;
        $scope.MenuEst = false;
        $scope.MenuSys = false;
        $scope.MenuLeads = false;


        $scope.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        function load() {
            $scope.loading = true;
            $scope.loadingAvisos = true;
            try {
                $scope.MenuCot = $scope.user.Permiso.find(x => x.vchClave == 'MenuCot').bitAcceso;
                $scope.menuUser = $scope.user.Permiso.find(x => x.vchClave == 'MenuUser').bitAcceso;
                $scope.MenuClient = $scope.user.Permiso.find(x => x.vchClave == 'MenuClient').bitAcceso;
                $scope.Menuproduct = $scope.user.Permiso.find(x => x.vchClave == 'MenuProduct').bitAcceso;
                $scope.MenuEst = $scope.user.Permiso.find(x => x.vchClave == 'MenuEst').bitAcceso;
                $scope.MenuSys = $scope.user.Permiso.find(x => x.vchClave == 'MenuSys').bitAcceso;
                $scope.MenuLeads = $scope.user.Permiso.find(x => x.vchClave == 'MenuLead').bitAcceso;
            }
            catch (Exce) {
                console.log("Error al obtener accesos: " + Exce.Message);
            }
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Usuario: $rootScope.Globals.CurrentUserCot,
                    bitLeido: $scope.TipoMensaje == 'No leídos' ? false : true
                };
                homeServices.ObtenerProximosEventos(request, function (response) {
                    $scope.eventos = response;
                });
                homeServices.ObtenerCotizacionesNum(request, function (responseCot) {
                    $scope.NumeroCotizaciones = responseCot;
                    $scope.loading = false;
                });
                homeServices.ObtenerAvisos(request, function (responseAvisos) {
                    $scope.avisos = responseAvisos;
                    if (responseAvisos != null)
                        $scope.showAvisos = true;
                    $scope.loadingAvisos = false;
                });
            }
            catch (exce) {
                console.log("Error: " + exce.Message);
                $scope.loading = false;
                $scope.loadingAvisos = false;
            }
        }
        load();

        $(function () {

            // elementos de la lista
            var menues = $(".navbar-nav li");

            // manejador de click sobre todos los elementos
            menues.click(function () {
                // eliminamos active de todos los elementos
                menues.removeClass("active");
                // activamos el elemento clicado.
                $(this).addClass("active");
            });
        });


        $scope.EditarUsuario = function (ev) {
            $mdDialog.show({
                controller: 'editarUsuarioController',
                templateUrl: 'app/modules/home/user/update/editarUsuarioView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                skipHide: true
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


        $scope.AccesoDirectoNC = function (ev) {
            if ($scope.MenuCot) {
                $location.path('/cotizacion/add');
            }
            else {
                var alert = $mdDialog.alert({
                    title: 'Advertencia',
                    textContent: "No tiene acceso",
                    ok: 'Aceptar',
                    skipHide: true
                });
                $mdDialog.show(alert);
            }
        };

        $scope.AccesoDirectoAs = function (ev) {
            if ($scope.MenuCot) {
                $location.path('/cotizacion');
            }
            else {
                var alert = $mdDialog.alert({
                    title: 'Advertencia',
                    textContent: "No tiene acceso",
                    ok: 'Aceptar',
                    skipHide: true
                });
                $mdDialog.show(alert);
            }
        };

        $scope.AccesoDirectoSC = function (ev) {
            if ($scope.MenuClient) {
                $location.path('/clientes/add');
            }
            else {
                var alert = $mdDialog.alert({
                    title: 'Advertencia',
                    textContent: "No tiene acceso",
                    ok: 'Aceptar',
                    skipHide: true
                });
                $mdDialog.show(alert);
            }
        };

        $scope.VerImagen = function (evento, ev) {
            $mdDialog.show({
                controller: 'viewEventoController',
                templateUrl: 'app/modules/home/viewEvento/viewEventoView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    evento: evento
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



        $scope.IrDireccion = function (aviso, ev) {
            $mdDialog.show({
                controller: 'aprobarDireccionController',
                templateUrl: 'app/modules/home/aprobarDireccion/aprobarDireccionView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true,
                locals: {
                    aviso: aviso
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

        $scope.IngresarEvento = function (evento, ev) {
            var response = '';
            $rootScope.evento = evento;
            $cookieStore.put('evento', evento);
            $location.path('/leads/registro');
            $mdDialog.hide(response);
        };

        $scope.IrCotizacion = function (cotizacion, ev) {
            $rootScope.cotizacion = cotizacion;
            $cookieStore.put('cotizacion', cotizacion);
            $location.path('/cotizacion/update');
        };

        $scope.TipoMensajeChange = function (ev, TipoMensaje) {
            $scope.loadingAvisos = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Usuario: $rootScope.Globals.CurrentUserCot,
                    bitLeido: TipoMensaje == 'No leídos' ? false : true
                };
                homeServices.ObtenerAvisos(request, function (responseAvisos) {
                    $scope.avisos = responseAvisos;
                    if ($scope.avisos.length > 0)
                        $scope.showAvisos = true;
                    $scope.loadingAvisos = false;
                });
            }
            catch (exce) {
                $scope.loading = false;
            }
        };

        $scope.IrCliente = function (aviso, ev) {
            try {
                $scope.loading = true;
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    intClienteID: aviso.intClienteIDALta,
                    intCotizacionID: aviso.intCotizacionID != null ? aviso.intCotizacionID : 0,
                    UserId: $rootScope.Globals.CurrentUserCot.intUsuarioID
                };

                homeServices.GeneraDetalleCliente(request, function (response) {
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
                console.log("Error al ver el detalle del cliente: " + Exce.Message);
            }
        };

        $scope.MarcarLeido = function (aviso, event) {
            $scope.loadingAvisos = true;
            try {
                var request = {
                    token: $rootScope.Globals.CurrentUserCot.Token,
                    Usuario: $rootScope.Globals.CurrentUserCot,
                    Aviso: aviso
                };
                homeServices.MarcarLeido(request, function (response) {
                    var request = {
                        token: $rootScope.Globals.CurrentUserCot.Token,
                        Usuario: $rootScope.Globals.CurrentUserCot,
                        bitLeido: $scope.TipoMensaje == 'No leídos' ? false : true
                    };
                    homeServices.ObtenerAvisos(request, function (responseAvisos) {
                        $scope.avisos = responseAvisos;
                        if (responseAvisos != null)
                            $scope.showAvisos = true;
                        $scope.loadingAvisos = false;
                    });
                });
            }
            catch (exce) {
                $scope.loading = false;
                $scope.loadingAvisos = false;
            }
        };
    }]);